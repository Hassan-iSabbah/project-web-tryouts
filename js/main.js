let canvas = document.querySelector("canvas");

const maxw = 1990;
const maxh = 980;

canvas.width = maxw;
canvas.height = maxh;


let groundoffset = 119.6;
const ground = maxh / (groundoffset / 100);

//draw rect

let c = canvas.getContext("2d");

//consts

const gravity = 0.8;



const main_player = new Fighter({
    x: 50,
    y: 0,
    offset :{
        x: 350,
        y: 265
    },
    name: "player_one",
    height: 200,
    width:  77,
    scale: 3.8,
    attack_box_offset: {
        y: 50,
        x: 50
    }

});

const team_player = new Fighter({
    x: 900,
    y: maxh - 300,
    color: "yellow",
    name: "player_two",
    config: {
        mLeft: 'ArrowLeft',
        mRight: 'ArrowRight',
        mUp: 'ArrowUp',
        mDown: 'ArrowDown',
        anchor: 'Numpad1',
        attack_one: 'Numpad0',
        attack_two: 'Numpad2'
    },
    offset :{
        x: 345,
        y: 285
    },
    attack_box_offset: {
        y: 50,
        x: -150
    },

    height: 200,
    width:  57,
    scale: 3.8,

});



fetch_json(main_player, "samurai_mack");
fetch_json(team_player, "kenji");



main_player.enemies.push(team_player);
team_player.enemies.push(main_player);








class Game {
    //iv

    round;

    isRoundOver = false;


    players;

    //components

    win_message;

    sending_message;

    //c
    constructor() {
        this.players = [];

        //load components

        this.gui = document.querySelector('.canvas__gui');

        this.isRoundOver = false;
    }


    //a


    //m

    add_player(player) {
        this.players.push(player);
    }




    //ROUND 2 FIGHT
    new_round() {
        this.round++;
        this.secs = 0;
        this.set_win_message("");


        //revive players

        this.players.forEach((player) => {
            player.reset_death();
        })
        this.isRoundOver = false;
    }



    //ROUND ONEE FIGHTTTHTTT!~!!!

    reset_game() {
        this.round = 1;

        this.secs = 1;

        //this.set_win_message("");
    }


    end_round(winner, loser) {
        console.log(this.round);

        let verbs = ["smashed", "pulverized", "destroyed", "deleted", "ended"]
        let random_verb = verbs[Math.trunc(Math.random() * verbs.length)];
        var phrase = `${winner.name} has ${random_verb} ${loser.name}!`;

        this.set_win_message(phrase);
        console.log(phrase);

        winner.talk("get fucked bombaclot");

        setTimeout(() => {

            this.new_round();

            winner.talk(`${winner.enemies[0].name}!! I will murder you`);

        }, 2000);

    }

    set_win_message(message = '') {
        this.win_message = document.querySelector(".canvas__gui .win__message");
        this.win_message.innerHTML = message;
    }
    //aux

    init() {


        this.reset_game();

        setInterval(() => {
            let timer = document.querySelector(".timer");
            timer.innerHTML = this.secs++;
        }, 1000);


        window.addEventListener('keydown', (event) => {
            let code = event.code;

            for (let i = 0; i < this.players.length; i++) {
                let player = this.players[i];

                if (!player.dead) {
                    player.check_keys(true, code);
                }
            }



        });



        window.addEventListener('keyup', (event) => {
            event.preventDefault();
            let code = event.code;

            for (let i = 0; i < this.players.length; i++) {
                let player = this.players[i];

                if (!player.dead) {
                    player.check_keys(false, code);
                }
            }



        });


        for (let i = 0; i < this.players.length; i++) {
            let player = this.players[i];

            this.gui.innerHTML = this.gui.innerHTML + `<p class="text_bubble ${player.name}"> ${player.enemies[0].name}!! I will murder you </p>`;
            player.text_bubble_loaded = true;
        }

        this.sending_message = false;


        this.background = new Sprite({
            x: 0,
            y: 0,
            offset: {
                x: 0,
                y: 0
            },
            imgSrc: "./img/background.png",
            width: maxw,
            height: maxh,
            scale: 1.7
        });


        this.shop = new Sprite({
            x: 1100,
            y: 500,
            offset: {
                x: 0,
                y: 0
            },
            imgSrc: "./img/sprites/shop.png",
            col: 6,
            width: 118,
            height: 128,
            scale: 2.49,
            buffer: 17
        });


        this.map = [
            this.background
            ,
            this.shop
            
        ];



    }


    run(funct) {

        draw({
            color: "black",
            w: maxw,
            h: maxh
        });


        for (let i = 0; i < this.map.length; i++) {
            let sprite = this.map[i];
            sprite.update();
        }


        for (let i = 0; i < this.players.length; i++) {
            let player = this.players[i];
            player.update();


            let selector = `p.text_bubble.${player.name}`;
            let text_bubble = document.querySelector(selector);
            text_bubble.style.left = (player.position.x) + 'px';
            text_bubble.style.top = (player.position.y - 200) + 'px';


            if (this.sending_message = false) {
                this.sending_message = true;
                setTimeout(
                    () => {

                        player.talk(`${player.enemies[0].name}!! I will pulverize you`);
                        this.sending_message = false;
                    }
                    , 5000
                );
            }

            if (this.isRoundOver === false) {
                if (player.fallen === true) {
                    this.end_round(player.enemies[0], player);
                    this.isRoundOver = true;
                    break;
                } else if (
                    player.enemies[0].fallen === true
                ) {
                    this.isRoundOver = true;
                    this.end_round(player, player.enemies[0]);
                    break;
                }

            }
        }



        window.requestAnimationFrame(() => { this.run(funct) });

    }




    //end of Class ^^Game
}

//df


const game = new Game();

game.add_player(main_player);
game.add_player(team_player);

game.init();

game.run(game.run());
