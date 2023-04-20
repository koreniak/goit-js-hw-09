const DELAY = 1000;
let colorId = null;

const refs = {
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
    body: document.querySelector('body')
};

refs.stopBtn.disabled = true;
refs.startBtn.addEventListener('click', startChangeBodyColor);
refs.stopBtn.addEventListener('click', stopChangeBodyColor);

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};

function startChangeBodyColor () {
    colorId = setInterval(() => {
        refs.body.style.backgroundColor = getRandomHexColor()
    }, DELAY);
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
};

function stopChangeBodyColor() {
    clearInterval(colorId)
    refs.startBtn.disabled = false;
    refs.stopBtn.disabled = true;
};