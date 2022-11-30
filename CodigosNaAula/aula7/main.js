/* formas diferentes de declarar funções em JS.
    
    function soma(a,b) 
    {
        return a + b
    }

    const soma2 = function (a,b) 
    {
        return a + b
    }

    const soma3 = (a,b) => {
        return a + b
    }

    const soma4 = (a,b) => a + b

    // Uma função retornando uma função
    const hello = function() {
        return function ()
        {
            return "Hello World"
        }
    }
    
    // função de chamada imediata
    (function () {
        const vet = [];
        vetor.push(5);
        console.log(vet)
    })()
*/

/* Objetos
    const ufam = {
        nome: "ufam",
        fundacao: 1909,
        imprime: function() {
            console.log(this.nome);
        }
    }
    ufam.imprime()
*/

/* Hoisting
    foo();

    function foo(){
        a = 3;
        var a;
        document.write(a);
    }
*/ 