function initDragAndDrop() {
    initElements();
//     shuffleCards();
//     initDropzones();
//     initCanvasDropZone();
//     //initDragEvents();
 }

function initElements() {
    let square = document.querySelector('#square');
  

        square.setAttribute("draggable", true)

        square.addEventListener("click", handleDragStart);
}


    
square.classList.add("highlight")



// function handleDragEnd(ev) {
//     ev.target.classList.remove("highlight")
    
   


 initDragAndDrop();