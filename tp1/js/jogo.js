(function () {
    // Definam a altura e largura da tela do jogo
    const TAMX = 600;
    const TAMY = 800;
    // Determina o FPS
    const FPS = 100;

    const PROB_ENEMY_SHIP =  0.5;
    
    let space, ship;
    let enemies = [];

    function init() 
    {
        space = new Space();
        ship = new Ship();
        const interval = window.setInterval(run, 1000 / FPS)
    }

    window.addEventListener("keydown", (e) => {
        if(e.key === "ArrowLeft") ship.mudaDirecao(-1);
        if(e.key === "ArrowRight") ship.mudaDirecao(+1);
    })

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

    class Ship
    {
        constructor() 
        {
            this.element = document.getElementById("ship")
            this.AssetDirecoes = [
                "assets/playerLeft.png",
                "assets/player.png",
                "assets/playerRight.png"
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
            if (this.direcao === 0) this.element.style.left = `
                ${parseInt(this.element.style.left)-1}px`
            if (this.direcao === 2) this.element.style.left = `
                ${parseInt(this.element.style.left)+1}px`
            space.move();
        }
    }
    
    class EnemyShip
    {
        constructor()
        {
            this.element = document.createElement("img");
            this.element.className = "enemy-ship";
            this.element.src = "assets/enemyShip.png";
            this.element.style.top = "0px";
            this.element.style.left = `${
                Math.floor(Math.random()*TAMX)
            }px`
            space.element.appendChild(this.element);
        }
        move()
        {
            this.element.style.top = `${
                parseInt(this.element.style.top) + 2
            }px`;
        }
    }
    // Run define o que vai acontecer no jogo 
    function run() {
        const random_enemy_ship = Math.random() * 100;
        if(random_enemy_ship <= PROB_ENEMY_SHIP)
        {
            //Instancia o enimigo
            enemies.push(new EnemyShip());
        }
        enemies.forEach((e) => e.move())
        ship.move();
    }
    init();
})();