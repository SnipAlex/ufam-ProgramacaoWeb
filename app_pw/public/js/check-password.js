(function () {
    const buttonSubmit = document.getElementById("button-submit")
    buttonSubmit.addEventListener("click", (e) => {
        const senha = document.getElementById("senha").value;
        const confirmaSenha = document.getElementById("confirm-senha").value;
        if (senha === confirmaSenha) document.getElementById("signup-for").submit();
    });
}());