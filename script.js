const micBtn = document.getElementById('micBtn');
const thinking = document.getElementById('thinking');
const responseText = document.getElementById('responseText');
const responseArea = document.getElementById('responseArea');

micBtn.addEventListener('click', () => {
responseArea.classList.remove('hidden');
thinking.classList.remove('hidden');
responseText.classList.add('hidden');

// Simulate AI processing
setTimeout(() => {
thinking.classList.add('hidden');
responseText.classList.remove('hidden');
responseText.innerText = "Sure! I'd be happy to assist you with your insurance inquiry. 😊";
}, 3000); // Replace this with your real AI API call
});
