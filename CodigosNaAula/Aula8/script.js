(function (){
    // const value = document.myForm.myInput;
    // console.log(value)
    // const button = document.getElementById("button")
    // button.onclick = () => {
    //     const bloco = document.getElementById("bloco")
    //     bloco.className += " nova-classe"
    // }
    // const button = document.getElementById("button")
    // button.onclick = () => {
    //     const bloco = document.createElement("div");
    //     const texto = document.createTextNode("Ola mundo");
    //     bloco.appendChild(texto);
    //     document.body.appendChild(bloco);
    // };
    // window.addEventListener("click", () => {
    //     console.log("clicada 1")
    // })
    // window.addEventListener("click", () => {
    //     console.log("clicada 2")
    // })
    // window.onclick = () => {
    //     console.log("click A")
    // }
    // window.onclick = () => {
    //     console.log("click B")
    // }
    window.addEventListener("click", (e) => {
        const dot = document.createElement("div");
        dot.className = "dot"
        dot.style.top = `${e.clientY}px`
        dot.style.left = `${e.clientX}px`
        // tem que terminar esse codigo
    })
})();