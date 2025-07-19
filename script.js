// ------ Glowing Bloom Sphere ------
const canvas = document.getElementById('bloomCanvas');
const ctx = canvas.getContext('2d');
function resizeCanvas() {
    const size = Math.min(canvas.parentElement.offsetWidth, canvas.parentElement.offsetHeight);
    canvas.width = size; canvas.height = size;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const dots = [];
const DOTS_N = 320;
function createDots() {
    dots.length = 0;
    const R = canvas.width / 2 - 16;
    for (let i = 0; i < DOTS_N; i++) {
        let angle = Math.random() * 2 * Math.PI;
        let radius = Math.random() * R * 0.9;
        dots.push({
            x: canvas.width / 2 + radius * Math.cos(angle),
            y: canvas.height / 2 + radius * Math.sin(angle),
            baseR: radius,
            angle: angle,
            r: Math.random() * 1.5 + 1,
            color: `hsla(${35 + 50 * Math.random()},92%,65%,.88)`
        });
    }
}
function animateDots() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < dots.length; i++) {
        let dot = dots[i];
        dot.angle += 0.0017 * (i % 2 == 0 ? 1 : -1);
        dot.baseR += Math.sin(Date.now() / 900 + i) * 0.09 * (i % 2 == 0 ? 1 : -1);
        dot.x = canvas.width / 2 + dot.baseR * Math.cos(dot.angle);
        dot.y = canvas.width / 2 + dot.baseR * Math.sin(dot.angle);
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.r, 0, 2 * Math.PI);
        ctx.fillStyle = dot.color;
        ctx.shadowColor = i % 6 == 0 ? '#ffae00' : '#1af2ff';
        ctx.shadowBlur = dot.r * 6;
        ctx.fill();
        ctx.shadowBlur = 0;
    }
    requestAnimationFrame(animateDots);
}
resizeCanvas(); createDots(); animateDots();
window.addEventListener('resize', () => { resizeCanvas(); createDots(); });

// ------ ElevenLabs Widget Floating logic ------
const elWidget = document.getElementById("elevenlabsWidget");
const elLabel = elWidget.querySelector(".widget-label");
const elBox = elWidget.querySelector(".widget-box");

elLabel.onclick = () => {
    elWidget.classList.toggle("active");
    if (elWidget.classList.contains('active')) { elBox.focus(); }
};
window.addEventListener('click', e => {
    if (elWidget.classList.contains('active')) {
        if (!elWidget.contains(e.target)) elWidget.classList.remove('active');
    }
}, true);

// --------- Dynamic Flash Message for Conversation Summary ---------
const flashSummary = document.getElementById('flash-summary');
let conversationSummary = [];
function showSummaryFlash() {
    if (conversationSummary.length === 0) return;
    flashSummary.innerHTML = `
      <b>Conversation Summary</b><br>
      <ul style="list-style:none;padding:0; margin:0;">
        ${conversationSummary.slice(-10).map(entry =>
            `<li><span style="color:${entry.who === "AI" ? "#631bb7" : "#263ad6"};">${entry.who}:</span> ${entry.text}</li>`
        ).join('')}
      </ul>
    `;
    flashSummary.classList.add('visible');
    clearTimeout(flashSummary.hideTimer);
    flashSummary.hideTimer = setTimeout(() => {
        flashSummary.classList.remove('visible');
    }, 6000);
}
function observeElevenLabsMessages() {
    const convai = document.querySelector("elevenlabs-convai");
    if (!convai) return;

    const waitForShadowAndMessages = () => {
        if (convai.shadowRoot) {
            // Try to find the main message container (specific to ElevenLabs)
            const allDivs = Array.from(convai.shadowRoot.querySelectorAll('div'));
            const msgList = allDivs.find(container =>
                // Heuristic: has several immediate children, each a short div, and first is likely a prompt or AI msg
                container.childElementCount > 1 && Array.from(container.children).every(child=>child.tagName==="DIV")
            );
            if (msgList) {
                let prevMsgs = [];
                const msgObserver = new MutationObserver(() => {
                    const items = Array.from(msgList.querySelectorAll('div'));
                    const allMsgs = items.map(div => div.textContent || "").filter(Boolean);
                    const newMsgs = allMsgs.slice(prevMsgs.length);
                    newMsgs.forEach(rawMsg => {
                        let who = "AI";
                        let msg = rawMsg.trim();
                        // Heuristic: if first char is > or "User:" or "You:", treat as human, otherwise AI.
                        if (/^((you|user)[:,\- ]|[?.!'"]?\s?$)/i.test(msg) || msg.length < 80) {
                            if (conversationSummary.length === 0 || conversationSummary[conversationSummary.length-1].who === "AI") {
                                who = "Human";
                            }
                        }
                        conversationSummary.push({who, text: msg});
                        showSummaryFlash();
                    });
                    prevMsgs = allMsgs;
                });
                msgObserver.observe(msgList, {childList: true, subtree: true});
                window.__elevenlabsMsgObserver = msgObserver;
            }
        } else {
            setTimeout(waitForShadowAndMessages, 240);
        }
    };
    waitForShadowAndMessages();
}

// ------ Start Speaking Button + Mic Sync ------
const speakBtn = document.getElementById('speakBtn');
let listening = false;
function resetSpeakUI() {
    listening = false;
    speakBtn.classList.remove('active');
    speakBtn.querySelector('span').innerText = "Start Speaking";
    canvas.parentElement.style.boxShadow = "";
    document.body.classList.remove('listening-bg');
}
// --- ElevenLabs mic state via MutationObserver ---
function observeElevenLabsMic() {
    const convai = document.querySelector("elevenlabs-convai");
    if (!convai) return;
    const tryObserve = () => {
        if (convai.shadowRoot) {
            const micButton = convai.shadowRoot.querySelector('button[aria-label*="record"], button');
            if (micButton) {
                const observer = new MutationObserver(() => {
                    const ariaPressed = micButton.getAttribute('aria-pressed');
                    const micText = micButton.textContent.toLowerCase();
                    const isMicActive = ariaPressed === "true" ||
                        micText.includes("stop") ||
                        micButton.classList.contains('active');
                    if (!isMicActive) {
                        resetSpeakUI();
                    }
                });
                observer.observe(micButton, { attributes: true, attributeFilter: ['aria-pressed', 'class'], childList: false, subtree: false });
                window.__elevenlabsMicObserved = observer;
            }
        } else {
            setTimeout(tryObserve, 200);
        }
    };
    tryObserve();
}

speakBtn.onclick = () => {
    elWidget.classList.add('active');
    conversationSummary = []; // Clear summary for new session
    listening = true;
    speakBtn.classList.add('active');
    speakBtn.querySelector('span').innerText = "Listening...";
    canvas.parentElement.style.boxShadow = "0 0 128px 63px #1af2ff98,0 0 32px 15px #ffae0077";
    document.body.classList.add('listening-bg');

    setTimeout(() => {
        const convai = document.querySelector("elevenlabs-convai");
        if (convai && convai.shadowRoot) {
            const micButton = convai.shadowRoot.querySelector('button[aria-label*="record"], button');
            if (micButton) micButton.click();
        }
        observeElevenLabsMic();
        observeElevenLabsMessages();
    }, 500);
};
