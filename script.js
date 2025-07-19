const bloom = document.getElementById("bloomSphere");
const speakBtn = document.getElementById("speakBtn");

let listening = false;

speakBtn.addEventListener("click", () => {
  listening = !listening;
  bloom.style.animation = listening ? "bloom 1.5s infinite ease-in-out" : "none";
  bloom.style.opacity = listening ? 1 : 0;
  speakBtn.innerText = listening ? "Listening..." : "Start Speaking";

  const convai = document.querySelector("elevenlabs-convai");
  if (convai && convai.shadowRoot) {
    const mic = convai.shadowRoot.querySelector("button");
    if (mic) mic.click();
  }
});

// Animated Dots
const canvas = document.getElementById("dotsCanvas");
const ctx = canvas.getContext("2d");
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

const dots = [];
const totalDots = 500;

for (let i = 0; i < totalDots; i++) {
  let angle = Math.random() * 2 * Math.PI;
  let radius = Math.random() * (canvas.width / 2);
  let x = canvas.width / 2 + radius * Math.cos(angle);
  let y = canvas.height / 2 + radius * Math.sin(angle);
  dots.push({x, y, r: Math.random() * 2 + 0.5});
}

function drawDots() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#FFA500";
  for (let dot of dots) {
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, dot.r, 0, 2 * Math.PI);
    ctx.fill();
  }
  requestAnimationFrame(drawDots);
}

drawDots();
