
function valida(entrada)
{
    if (entrada == 1)
    {
        return "Papel"
    }
    else if(entrada == 2)
    {
        return "Pedra"
    }
    else if(entrada == 3)
    {
        return "Tesoura"
    }
    else
    {
        return "Invalida"
    }
}

function jogadoRobo()
{
    return Math.floor((Math.random() * 3)+1); // gera um numero aleatorio entre 1 a 3.
}

function main()
{
    // pontuacao
    let pontos = 0
    let perdeu = false
    let IAPlay
    //let ffd = parseInt(prompt()); // Ler input do jogador
    let ffd;
    console.log(`
        Escolha sua jogada:
        1 - Papel
        2 - Pedra
        3 - Tesoura
    `)
    do
    {
        ffd = parseInt(prompt()); // entrada
        if (valida(ffd) != "Invalida")
        {
            IAPlay = jogadoRobo();
            console.log("O computador jogou " + valida(IAPlay))
            if(valida(ffd) === valida(IAPlay)) console.log("A rodada empatou")
            else
            {
                if (valida(ffd) === "Papel" && IAPlay === 2) 
                {
                    console.log("Você ganhou!")
                    pontos++;
                }
                if (valida(ffd) === "Papel" && IAPlay === 3)
                {
                    console.log("Você perdeu!")
                    perdeu = true;
                }
    
                if (valida(ffd) === "Pedra" && IAPlay === 3) 
                {
                    console.log("Você ganhou!")
                    pontos++;
                }
                if (valida(ffd) === "Pedra" && IAPlay === 1)
                {
                    console.log("Você perdeu!")
                    perdeu = true;
                }
    
                if (valida(ffd) === "Tesoura" && IAPlay === 1) 
                {
                    console.log("Você ganhou!")
                    pontos++;
                }
                if (valida(ffd) === "Tesoura" && IAPlay === 2) 
                {
                    console.log("Você perdeu!")
                    perdeu = true;
                }
            }
        }
        else perdeu = true;
        
    } while(!perdeu)
    console.log("Pontuação..: " + pontos);
}
main();