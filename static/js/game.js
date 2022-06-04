document.addEventListener('DOMContentLoaded', (event) => {
    initDragAndDrop();
  });
let numbers_of_replaced = 0


function initDragAndDrop() {
    initElements();
    initDropZones();
}


function initElements() {
    let all_cards = document.querySelectorAll('.block');
    all_cards.forEach(function(element) {
       
        element.setAttribute("draggable", true)
        element.addEventListener("dragstart", handleDragStart);
    })
}


function initDropZones() {
    let all_cards = document.querySelectorAll('.zone');
    all_cards.forEach(function(element) {
        element.addEventListener("dragover", handleDragOver);
        element.addEventListener("drop", handleDrop);    
    })
}


function handleDragStart(ev) {
    ev.dataTransfer.setData("text/plain", ev.target.id);
}


function handleDrop(ev) { 
    ev.preventDefault();
    const id = ev.dataTransfer.getData("text/plain");
    const element = document.getElementById(id);
    if ( 'slot-'+ element.id === ev.target.id) {
        console.log(ev.target.id)
        console.log(element.id)
        bg = window.getComputedStyle(element).backgroundColor;
        bor = window.getComputedStyle(element).borderColor;
        console.log(bg)
        element.id = ev.target.id
        ev.target.parentNode.replaceChild(element,ev.target)
        element.style.backgroundColor = bg
        element.style.borderColor = bor
        numbers_of_replaced++
        checkWinnig()
        show_scores()
    }
    ev.target = document.querySelectorAll('.zone')
}


function checkWinnig () {
    if (numbers_of_replaced === 7) {
        win()
        stop()
        document.querySelector(".container").classList.add("invisible")

        return true
    }
}


function handleDragOver(ev){
    ev.preventDefault();
}


function show_scores() {
    if (checkWinnig()) {
        console.log(localStorage)
        let user_scores = localStorage.getItem("user_scores")
        user_scores = Number(user_scores) + 10

        localStorage.setItem("user_scores", user_scores);

        document.getElementById("scores").innerHTML = localStorage.getItem("user_scores")

        document.querySelector(".your_score").classList.add("show", "blue-color")
    }
}

