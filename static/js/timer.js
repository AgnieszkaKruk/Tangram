const ONE_SECOND = 1000;

let clock_interval = null;
let game_over_time = null;
let audio = new Audio('../static/music/kahoot.mp3');
let $clock_h1 = document.querySelector('h1');
let $button = document.getElementsByClassName('play-btn')[0]

setup(1);

function setup(minutes) {
    initButton(minutes);
}

function start(minutes) {
    let time = minutes * 60 * ONE_SECOND;
    let now = new Date();
    game_over_time = new Date(now.getTime() + time);
    render();
    clock_interval = setInterval(() => {
        render();
        if (game_over_time <= new Date()) {
            stop();
        }
    }, ONE_SECOND);
}

function render() {
    $clock_h1.textContent = formatTime();
}

function formatTime() {
    let time = game_over_time - new Date();
    let min = Math.floor(time / ONE_SECOND / 60)
    let minutes = String(min < 0 ? 0 : min).padStart(2, '0');
    let sec = Math.ceil(time / ONE_SECOND) % 60;
    let seconds = String(sec).padStart(2, '0');
    return `${minutes}:${seconds}`
}

function stop() {
    clearInterval(clock_interval);
    win();
}

function win() {
    if (audio.played) {
        audio.pause();
    }

    const start = () => {
        setTimeout(function () {
            $clock_h1.remove();
            startConfetti();
        }, 1000);
    };

    const stop = () => {
        setTimeout(function () {
            stopConfetti();
        }, 5000);
    };

    start();
    stop();
}

function lose() {
    if (audio.played) {
        audio.pause();
    }
    $clock_h1.classList.add('red-color');
}

function initButton(minutes) {
    audio.load();
    $button.addEventListener('click', () => {
        play(minutes);
    });
}

function play(minutes) {
    start(minutes);
    audio.play();
    $button.remove();
}
