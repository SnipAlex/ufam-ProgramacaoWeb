(function () {
    // Definam a altura e largura da tela do jogo
    const TAMX = 600;
    const TAMY = 800;
    // Determina o FPS
    const FPS = 100;

    const PROB_ENEMY_SHIP =  0.5; // Probilidade de aparecer nave inimiga
    const PROB_ASTEROIDE = 0.3; // Probilidade de aparecer asteroide

    let space, ship;
    let enemies = [];
    let pause = true;
    let Dificuldade = 1
    let pausaTempo;
    let points = 0;
    let VIDAS = 3;

    // Função de pontuação
    function pointAdd(enem)
    {
        switch (enem.tag) {
            case "AsteroideG":
                points += 50;
                break;
            case "InimigoNave":
                points += 100;
                break;
            case "DiscoV":
                points += 150;
                break;
            case "AsteroideP":
                points += 200;
                break;
            default:
                break;
        }
        document.querySelector("#pontuacao").innerHTML = points;
        console.log(points)
    }

    function startInterval()
    {
        //Aumenta a dificuldade do jogo a cada X tempo
        pausaTempo = setInterval(()=> {
            Dificuldade++;
            console.log(`Dificuldade aumentada para: ${Dificuldade}`)
        }, 60000);
    }

    function stopInterval() {
        clearInterval(pausaTempo);
    }

    function init() 
    {
        space = new Space();
        ship = new Ship();
        const interval = window.setInterval(run, 1000 / FPS)
    }
    //
    window.addEventListener("keydown", (e) => {
        if(e.key === "ArrowLeft") ship.mudaDirecao(-1);
        if(e.key === "ArrowRight") ship.mudaDirecao(+1);
        if(e.key === ' ') if(pause === false) ship.atira(); else Pause()
        if(e.key === "p") Pause();
    })
    // Pausa o jogo.
    function Pause()
    {
        if (pause === false)
        {
            pause = true;
            stopInterval();
        }
        else 
        {
            pause = false;
            startInterval();
        }
    }
    // Jogo terminado
    function GameOver()
    {
        Pause();      
        // Fun butão de recomeçar jogo

        // Zerar Pontuação
        points = 0;
        // Devolver vidas
        VIDAS = 3;
        // apagar inimigos
        enemies.element.remove();
        // Re-instanciar jogador.
        init();
    }

    class Space
    {
        constructor()
        {
            this.element = document.getElementById("space")
            this.element.style.width = `${TAMX}px`
            this.element.style.height = `${TAMY}px`
            this.element.style.backgroundPositionY = "0px"
        }
        move()
        {
            this.element.style.backgroundPositionY = `${
                parseInt(this.element.style.backgroundPositionY) + 1
            }px`
        }
    }
    
    class Tiro
    {
        constructor(nave)
        {
            this.tag = "Tiro"
            this.element = document.createElement("img"); // Cria um elemento que retorna imagem
            this.element.className = "Tiro-Jogador"; 
            this.element.src = "assets/laserRed.png"; // Recebe uma imagem da pasta
            this.navePos = nave.getBoundingClientRect()
            this.element.style.top = `${parseInt(this.navePos.top)}px`;
            this.element.style.left = `${parseInt(this.navePos.left)+36}px`;
            this.moveT();
            space.element.appendChild(this.element);
        }
        moveT()
        {
            let top = parseInt(this.element.style.top)
            let inID;
            console.log("Atirou")
            
            inID = setInterval(()=> {
                this.element.style.top = `${
                    top -= 20
                }px`;
                // Sera removido apos sair da tela
                if ( top < 0)
                {
                    if (this.element && this.element.parentElement) {
                        this.element.parentElement.removeChild(this.element);
                        console.log(`objeto..:${this.tag} removido`);
                        clearInterval(inID);
                    }
                }
            }, 10)
            
        }
        Morrer()
        {
            this.element.remove();
        }
    }

    class Ship
    {
        constructor() 
        {
            this.element = document.getElementById("ship")
            this.AssetDirecoes = [
                "assets/playerLeft.png",
                "assets/player.png",
                "assets/playerRight.png",
                "assets/playerDamaged.png"
            ]
            this.direcao = 1;
            this.element.src = this.AssetDirecoes[this.direcao];
            this.element.style.bottom = "20px"
            this.element.style.left = `${parseInt(TAMX/2)-50}px`
        }
        mudaDirecao(giro)
        {
            if (this.direcao + giro >= 0 && this.direcao + giro <= 2)
            {
                this.direcao += giro
                this.element.src = this.AssetDirecoes[this.direcao];
            }
        }
        move()
        {
            let lados = parseInt(this.element.style.left);
            
            if (this.direcao === 0 && lados > 1) this.element.style.left = `
            ${parseInt(this.element.style.left)-1}px`
            if (this.direcao === 2 && lados < 500) this.element.style.left = `
            ${parseInt(this.element.style.left)+1}px`
            space.move();
        }
        // Função de tiro da nave
        atira()
        {
            // Instancia um Objeto tiro
            return new Tiro(this.element)
        }
        detectaColisao(enemy)
        {
            let jogadorHitbox = this.element.getBoundingClientRect();
            let inimigoHitbox = enemy.getBoundingClientRect();

            return !(
                jogadorHitbox.bottom < inimigoHitbox.top ||
                jogadorHitbox.top > inimigoHitbox.bottom ||
                jogadorHitbox.right < inimigoHitbox.left ||
                jogadorHitbox.left > inimigoHitbox.right

            );
        }
        levouDano()
        {
            VIDAS--;
        }
        Morrer()
        {
            this.element.remove();
        }
    }
    
    class AsteroideGrande
    {
        constructor()
        {
            this.tag = "AsteroideG"
            this.element = document.createElement("img"); // Cria um elemento que retorna imagem
            this.element.className = "asteroideG"; 
            this.element.src = "assets/meteorBig.png"; // Recebe uma imagem da pasta
            this.element.style.top = "0px"; // Isso indica o movimento vertial do inimigo
            this.element.style.left = `${
                Math.floor(Math.random()*(TAMX-100))
            }px`
            space.element.appendChild(this.element);
            this.velocidade = Math.floor((Math.random()+1) * 2)
        }
        moveG()
        {
            // Verifica se o elemento ainda existe
            if(this.element.parentElement)
            {
                let topo = parseInt(this.element.style.top);
                this.element.style.top = `${
                    (parseInt(this.element.style.top) + this.velocidade) + Dificuldade
                }px`;
                if(topo > 800)
                {
                    this.element.parentNode.removeChild(this.element)
                    console.log(`objeto..:${this.tag} removido`);
                }
            }
        }
        detectaColisao(objeto)
        {
            let thisHitbox = this.element.getBoundingClientRect();
            let objetoHitbox = objeto.getBoundingClientRect ? objeto.getBoundingClientRect() 
            : objeto.getBoundingClientRect;

            return !(
                thisHitbox.bottom < objetoHitbox.top ||
                thisHitbox.top > objetoHitbox.bottom ||
                thisHitbox.right < objetoHitbox.left ||
                thisHitbox.left > objetoHitbox.right
            );
        }
        Morrer()
        {
            this.element.remove();
        }
    }
    class AsteroidePequeno
    {
        constructor()
        {
            this.tag = "AsteroideP"
            this.element = document.createElement("img"); // Cria um elemento que retorna imagem
            this.element.className = "asteroideP"; 
            this.element.src = "assets/meteorSmall.png"; // Recebe uma imagem da pasta
            this.element.style.top = "0px"; // Isso indica o movimento vertial do inimigo
            this.element.style.left = `${
                Math.floor(Math.random()*(TAMX-100))
            }px`
            space.element.appendChild(this.element);
            this.velocidade = Math.floor(Math.random() * 8)
        }
        moveP()
        {
            // Verifica se o elemento ainda existe
            if(this.element.parentElement)
            {
                let topo = parseInt(this.element.style.top);
                this.element.style.top = `${
                    (parseInt(this.element.style.top) + this.velocidade) + Dificuldade
                }px`;
                if(topo > 800)
                {
                    this.element.parentNode.removeChild(this.element)
                    console.log(`objeto..:${this.tag} removido`);
                }
            }

        }
        detectaColisao(objeto)
        {
            let thisHitbox = this.element.getBoundingClientRect();
            let objetoHitbox = objeto.getBoundingClientRect ? objeto.getBoundingClientRect() 
            : objeto.getBoundingClientRect;

            return !(
                thisHitbox.bottom < objetoHitbox.top ||
                thisHitbox.top > objetoHitbox.bottom ||
                thisHitbox.right < objetoHitbox.left ||
                thisHitbox.left > objetoHitbox.right
            );
        }
        Morrer()
        {
            this.element.remove();
        }
    }

    class EnemyShip
    {
        constructor()
        {
            this.tag = "InimigoNave"
            this.element = document.createElement("img"); // Cria um elemento que retorna imagem
            this.element.className = "enemy-ship"; 
            this.element.src = "assets/enemyShip.png"; // Recebe uma imagem da pasta
            this.element.style.top = "0px"; // Isso indica o movimento vertial do inimigo
            this.element.style.left = `${
                Math.floor(Math.random()*(TAMX-100))
            }px`
            space.element.appendChild(this.element);
            this.velocidade = Math.floor((Math.random() * 5)+1)
        }
        move()
        {
            // Verifica se o elemento ainda existe
            if(this.element.parentElement)
            {
                let topo = parseInt(this.element.style.top);
                this.element.style.top = `${
                    (parseInt(this.element.style.top) + this.velocidade) + Dificuldade
                }px`;
                if(topo > 800)
                {
                    this.element.parentNode.removeChild(this.element)
                    console.log(`objeto..:${this.tag} removido`);
                }
            }
        }
        detectaColisao(objeto)
        {
            let thisHitbox = this.element.getBoundingClientRect();
            let objetoHitbox = objeto.getBoundingClientRect ? objeto.getBoundingClientRect() 
            : objeto.getBoundingClientRect;

            return !(
                thisHitbox.bottom < objetoHitbox.top ||
                thisHitbox.top > objetoHitbox.bottom ||
                thisHitbox.right < objetoHitbox.left ||
                thisHitbox.left > objetoHitbox.right
            );
        }
        Morrer()
        {
            this.element.remove();
        }
    }

    class DiscoVoador
    {
        constructor()
        {
            this.tag = "DiscoV"
            this.element = document.createElement("img"); // Cria um elemento que retorna imagem
            this.element.className = "disco-voador"; 
            this.element.src = "assets/enemyUFO.png"; // Recebe uma imagem da pasta
            this.element.style.top = "0px"; // Isso indica o movimento vertial do inimigo
            this.element.style.left = `${
                Math.floor(Math.random()*(TAMX-100))
            }px`
            space.element.appendChild(this.element);
            this.velocidade = Math.floor((Math.random() * 6)+1)
        }
        moveD()
        {
            // Verifica se o elemento ainda existe
            if(this.element.parentElement)
            {
                let topo = parseInt(this.element.style.top);
                this.element.style.top = `${
                    (parseInt(this.element.style.top) + this.velocidade) + Dificuldade
                }px`;
                if(topo > 800)
                {
                    this.element.parentNode.removeChild(this.element)
                    console.log(`objeto..:${this.tag} removido`);
                }
            }
        }
        detectaColisao(objeto)
        {
            let thisHitbox = this.element.getBoundingClientRect();
            let objetoHitbox = objeto.getBoundingClientRect ? objeto.getBoundingClientRect() 
            : objeto.getBoundingClientRect;

            return !(
                thisHitbox.bottom < objetoHitbox.top ||
                thisHitbox.top > objetoHitbox.bottom ||
                thisHitbox.right < objetoHitbox.left ||
                thisHitbox.left > objetoHitbox.right

            );
        }
        Morrer()
        {
            this.element.remove();
        }
    }

    // Run define o que vai acontecer no jogo 
    function run() {
        if(pause === false)
        {
            const random_enemy_ship = Math.random() * 100;
            const random_asteroide = Math.random() * 50;
            const test = []
            if(random_enemy_ship <= PROB_ENEMY_SHIP)
            {
                //Instancia o enimigo
                if(Math.random() < 0.5)
                    enemies.push(new EnemyShip());
                else
                    enemies.push(new DiscoVoador());
            }
            
            if(random_asteroide <= PROB_ASTEROIDE)
            {
                if(Math.random() < 0.5)
                    enemies.push(new AsteroideGrande());
                else
                    enemies.push(new AsteroidePequeno());
            }
            // Para cada inimigo instanciado, ele vai fazer:
            enemies.forEach((e) => {
                // Fazer movimento
                if(e.tag === "InimigoNave")
                {
                    e.move()
                } 
                else if (e.tag === "DiscoV")
                {
                    e.moveD()
                }
                else if (e.tag === "AsteroideG" && e != null)
                {
                    e.moveG()
                }
                else if (e.tag === "AsteroideP")
                {
                    e.moveP()
                }
                // Fazer check de colisão
                if(ship.detectaColisao(e.element))
                {
                    console.log("Colisão")
                    // Fazer uma função de morte para jogador e inimigo.
                    ship.levouDano();
                    if(VIDAS < 0)
                    {
                        //Ativar gameover
                        //GameOver();
                    }
                    else
                    {
                        // Ship fun imunidade
                        console.log("Invenci. ativa")
                    }
                }

                // Fazer uma função de check do inimigo com tiro.
                if( document.querySelector(".Tiro-Jogador") !== null )
                {
                    if(e.detectaColisao(document.querySelector(".Tiro-Jogador")))
                    {
                        console.log("Inimigo colidiu");
                        const element = document.querySelector(".Tiro-Jogador");
                        pointAdd(e);
                        if (element) element.remove();
                        e.Morrer();
                    }
                }
            })
            ship.move();
        }
    }
    init();
})();