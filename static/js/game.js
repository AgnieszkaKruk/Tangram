document.addEventListener('DOMContentLoaded', (event) => {
    initDragAndDrop();
  });
let numbers_of_replaced = 0


function initDragAndDrop() {
    initElements();
    // shuffleCards();
    initDropZones();
    // initMixedCardsDropZone();
    //initDragEvents();
}

function initElements() {
    
    let all_cards = document.querySelectorAll('.block');
    all_cards.forEach(function(element) {
       
        element.setAttribute("draggable", true)
        element.addEventListener("dragstart", handleDragStart);
        element.addEventListener("dragend", handleDragEnd);    
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

function handleDragEnd(ev) {
    // console.log(ev.target.id); 
    // console.log(ev.target.parentElement.parentElement); 
   
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
        check_winnig()
        show_scores()
    }
   
    // ev.target.appendChild(element);
    // console.log(ev.target.id); 
    // console.log(ev.target.parent);
    
    
    
    ev.target = document.querySelectorAll('.zone')
    
    

    }

function check_winnig () {
    if (numbers_of_replaced === 7) {
        win()
        document.getElementById("slot-square").classList.add("slot-square2")
        return true

    }
}


function handleDragOver(ev){
    ev.preventDefault();
    // console.log('handleDragOver');
}

function checkShape(el) {
    return el.parentElement.className.startsWith('canvas')
}


function show_scores() {
    if (check_winnig()) {
        console.log(localStorage)
        let user_scores = localStorage.getItem("user_scores")
        user_scores = Number(user_scores) + 10

        localStorage.setItem("user_scores", user_scores);

        document.getElementById("scores").innerHTML = localStorage.getItem("user_scores")

        document.querySelector(".your_score").classList.add("show")
    }

}

