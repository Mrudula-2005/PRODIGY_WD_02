// script.js
let startTime;
let updatedTime;
let difference;
let timerInterval;
let running = false;
let lapNumber = 0;

const display = document.getElementById('display');
const lapsList = document.getElementById('laps');

function start() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        timerInterval = setInterval(updateDisplay, 1000);
        running = true;
    }
}

function pause() {
    if (running) {
        clearInterval(timerInterval);
        difference = new Date().getTime() - startTime;
        running = false;
    }
}

function reset() {
    clearInterval(timerInterval);
    display.textContent = '00:00:00';
    difference = 0;
    running = false;
    lapNumber = 0;
    lapsList.innerHTML = '';
}

function lap() {
    if (running) {
        const lapTime = display.textContent;
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${++lapNumber}: ${lapTime}`;
        lapsList.appendChild(lapItem);
    }
}

function updateDisplay() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    display.textContent = 
        `${(hours < 10) ? "0" + hours : hours}:` +
        `${(minutes < 10) ? "0" + minutes : minutes}:` +
        `${(seconds < 10) ? "0" + seconds : seconds}`;
}

document.getElementById('start').addEventListener('click', start);
document.getElementById('pause').addEventListener('click', pause);
document.getElementById('reset').addEventListener('click', reset);
document.getElementById('lap').addEventListener('click', lap);
