document.addEventListener("mousemove", function(Event){
    let b = document.createElement("div")
    b.classList.add("bolaAzul")
    
    b.style.left = Event.clientX + "px"
    b.style.top = Event.clientY + "px"
    
    document.body.appendChild(b)
});