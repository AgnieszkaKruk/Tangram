const ONE_SECOND = 1000;

let clock_interval = null;
let game_over_time = null;
let audio = new Audio('../static/music/kahoot.mp3');
let audio_win = new Audio('../static/music/oklaski.mp3')
let audio_lose = new Audio('../static/music/lose.mp3')
let $clock_h1 = document.querySelector('h1');
let $button = document.getElementsByClassName('play-btn')[0]

setup(0.6);

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
            if (!checkWinnig()) {
                lose()}
            stop()

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

}

function win() {
    if (audio.played) {
        audio.pause();
        audio_win.play()
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
    setTimeout(function () {
        window.location.href = "/start_game2";},
        5000);
}

function lose() {
    if (audio.played) {
        audio.pause();
    }
    audio_lose.play()
    $clock_h1.classList.add('red-color');
    document.querySelector(".lose").classList.add("show")
    document.querySelector(".invisible").classList.add("show")


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
