(function (){
    const botoes = document.getElementsByTagName("button")
    for ( let i = 0; i < botoes.length; i++){
        botoes[i].onclick = function (e) {
            console.log("botao clicado")
            document.getElementById("primeiro").style.display = e.target.innerHTML;
        }
    }
})()