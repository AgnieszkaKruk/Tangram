borad = 1

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
        // element.classList.add('board'+ 1)
        numbers_of_replaced++
        check_winnig()


    }
   
    // ev.target.appendChild(element);
    // console.log(ev.target.id); 
    // console.log(ev.target.parent);
    
    
    
    ev.target = document.querySelectorAll('.zone')
    
    

    }

function check_winnig (board) {
    if (numbers_of_replaced === 7) {
        win()


    }
}


function handleDragOver(ev){
    ev.preventDefault();
    // console.log('handleDragOver');
}

function checkShape(el) {
    return el.parentElement.className.startsWith('canvas')
}

//https://javascript.info/localstorage
//https://www.w3schools.com/howto/howto_js_redirect_webpage.asp