class Fighter extends Sprite {

    //iv
    config = {

    };


    attack_box = {

    }

    is_attacking = false;
    should_attack = null;

    health_points;
    max_health_points = null;
    max_mana_points = null;

    damage_points = 10;

    base_agility = 5;

    resistance_multiplyer = 0.1;
    dash_multipler = 0.87;

    dead;

    gudodama = [];

    text_bubble_loaded = false;
    projectiles;

    gravity_mode_on = true;

    sprites = null;

    //c
    constructor({ color = "red", x = 0, y = 0, config = null, offset = null, mp = 100, hp = 100, name = 'Gudo', width = 100, height = 200,
        imgSrc = '', scale = 1, buffer = 1,
        attack_box_offset = {
            x: 0,
            y: 0
        },
        col = 1
    }) {
        super({
            color, x, y, offset, imgSrc,
            width, height, scale,
            imgSrc, buffer,
            col
        });

        this.sprites = null

        this.enemies = [];
        this.projectiles = [];
        this.name = name;


        if (config === null) {
            this.config = {
                mLeft: 'KeyA',
                mRight: 'KeyD',
                mUp: 'KeyW',
                mDown: 'KeyS',
                anchor: 'KeyZ',
                attack_one: 'Space',
                attack_two: 'KeyQ'
            };

        } else {
            this.config = config;
        }

        this.attack_box = new Rectangle({
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: attack_box_offset,
            color: 'green',
            width: 200,
            height: 100
        });



        this.attack_box.visible = false;

        this.health_bar_red = new Rectangle({
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: {
                x: -35,
                y: -20
            },
            color: 'red',
            width: 170,
            height: 7
        });

        this.health_bar_green = new Rectangle({
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: {
                x: -35,
                y: -20
            },
            color: 'green',
            width: 170,
            height: 7
        });


        this.mana_bar_red = new Rectangle({
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: {
                x: -35,
                y: -10
            },
            color: 'red',
            width: 170,
            height: 7
        });

        this.mana_bar_blue = new Rectangle({
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: {
                x: -35,
                y: -10
            },
            color: 'cyan',
            width: 170,
            height: 7
        });
        this.health_points = hp;
        this.mana_points = mp;

        this.dead = false;
        this.move_right_died = null;

        this.gudodama = [];
        this.old_gudodama = [];

        //talk
        this.text_bubble = null;


        //orbs


        this.inital_position = {
            x: x,
            y: y
        };

        //this.truth_seeking();
        this.revolve = false;



        //end of constructor

        this.entities = [this.attack_box, this.health_bar_red, this.health_bar_green, this.mana_bar_red, this.mana_bar_blue];

        this.entities = [...this.entities
            //,   ...this.gudodama
        ];
        console.log(this.entities);

    }



    //a



    //m

    shoot() {
        if (this.mana_points > 0) {
            let bullet = new Projectile({
                offset: {
                    x: -50,
                    y: -50
                },
                x: this.position.x,
                y: this.position.y,
                color: "white",
                gravity_mode: true

            });
            this.projectiles.push(bullet);
            this.mana_points -= 8;
        }
        //console.log("bullets: ", this.projectiles);
    }

    //p

    set_sprites(sprites) {
        this.sprites = sprites;
    }


    talk(message = null) {

        if (this.text_bubble_loaded &&
            this.text_bubble === null) {

            let selector = `p.text_bubble.${this.name}`;
            this.text_bubble = document.querySelector(selector);
            this.text_bubble.style.left = (this.position.x) + 'px';
            this.text_bubble.style.top = (this.position.y - 200) + 'px';

        }


        if (message === null) {
            this.text_bubble.innerHTML = `${this.enemies[0].name}!! I will destroy you`;
        } else {
            this.text_bubble.innerHTML = message;
        }
    }

    truth_seeking() {
        setInterval(() => {
            this.revolve = !this.revolve;
        }, 1000);


        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 4; j++) {
                if ((i != 1 || j != 2) && (i != 1 || j != 1)) {
                    this.gudodama.push(new Projectile({
                        offset: {
                            x: (i * 100) - 50,
                            y: (j * 100) - 50
                        },

                        x: this.position.x + (i * 100) - 50,
                        y: this.position.y + ((j * 100) - 50),
                        color: "hsl(223, 100%, 23%)",
                        round: true,
                        radius: 12,
                        speed_multiplyer: 0.2
                    }));
                }
            }
        }
    }

    take_damage(dp) {
        //you were supposed to take 20 damage but due to your good armour, you only take 5 damage.
        let damage_should_take = (dp - (dp * this.resistance_multiplyer));
        this.health_points -= damage_should_take;

        this.enemies[0].mana_points += damage_should_take;

        if (this.health_points <= 0) {
            this.health_points = 0;
            this.dead = true;
        }

    }

    //aux


    switch_sprites(animation = "idle") {
        if (this.sprites != null) {
            this.reset_image(this.sprites["settings"]["path"] + animation + this.sprites["settings"]["extension"], this.sprites[animation]["col"], 1, this.sprites[animation]["buffer"]);
        }
    }


    update_entities() {



        for (let i = 0; i < this.entities.length; i++) {
            let entity = this.entities[i];

            entity.position.x = this.position.x + entity.offset.x;
            entity.position.y = this.position.y + entity.offset.y;

            entity.update();
        }



        /*   if (this.revolve) {
              this.update_gudodama(false);
  
  
  
  
              this.gudodama.forEach(orb => {
  
                  //orb.track(this.gudodama[0]);
  
  
                  orb.update();
              });
  
          } else {
              this.update_gudodama(true);
  
  
              this.gudodama.forEach(orb => {
  
                  //orb.position.x = this.position.x + orb.offset.x;
                  //orb.position.y = this.position.y + orb.offset.y;
  
                  orb.update();
              });
  
          } */



    }

    update_gudodama(going_home = false) {

        if (this.old_gudodama.length == 0) {
            this.old_gudodama = [...this.gudodama];
        }

        let track_me = []

        if (going_home) {
            track_me = [];

            for (let k = 0; k < this.gudodama.length; k++) {
                let orb = this.gudodama[k];
                track_me.push(new Rectangle({
                    position: {
                        x: this.position.x + orb.offset.x,
                        y: this.position.y + orb.offset.y
                    }
                }));
            }

        } else {
            track_me = [this.gudodama[this.gudodama.length - 1], ...this.old_gudodama]
        }



        console.log('places:', track_me);

        //hopefully going to the correct list of places
        for (let i = 0; i < this.gudodama.length; i++) {
            let orb = this.gudodama[i];
            if (going_home === true) {
                orb.speed_multiplyer = 1;
            } else {

                orb.speed_multiplyer = 0.2;
            }
            orb.track(track_me[i]);
        }

    }

    update_physics() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;



        if (this.position.y + this.height < ground) {
            this.velocity.y += this.gravity;
        } else {
            //
            this.velocity.y = 0;

            this.position.y = ground - this.height;


            this.gravity = 0.8;
        }
    }


    update_health() {
        if (this.max_health_points === null) {
            this.max_health_points = this.health_points;
        }
        //some fraction x reds width
        this.health_bar_green.width = this.health_bar_red.width * (this.health_points / this.max_health_points);
    }


    update_mana() {
        if (this.max_mana_points === null) {
            this.max_mana_points = this.mana_points;
        }
        //some fraction x reds width
        this.mana_bar_blue.width = this.mana_bar_red.width * (this.mana_points / this.max_mana_points);
        if (this.mana_bar_red.width < this.mana_bar_blue.width) {
            this.mana_bar_blue.width = this.mana_bar_red.width;
        }
    }

    update_state() {
        if (this.sprites != null) {

            //when keyboard isnt pressed the character should be normal and not twictching.

            if (!this.dead) {
                if (!this.is_attacking) {

                    if (this.velocity.x === 0 && this.velocity.y === 0 && this.last_action != 'idle') {
                        this.switch_sprites();
                        this.last_action = 'idle';
                    } else if (this.velocity.y < 0 && this.last_action != 'jump') {
                        this.switch_sprites('jump');
                        this.last_action = 'jump';
                    } else if (this.velocity.y > 0 && this.last_action != 'fall') {
                        this.switch_sprites('fall');
                        this.last_action = 'fall';
                    }
                    else if (this.velocity.x != 0 && this.last_action != 'run') {
                        this.switch_sprites('run');
                        this.last_action = 'run';
                    }


                }
            }

        }

    }


    update() {
        //draw everything and handle physics
        super.update();
        this.update_state();
        this.update_physics();
        this.update_entities();
        this.update_health();
        this.update_mana();
        this.handle_death();
        this.update_bullets();

        //handle controls
        this.handle_attack();
        // console.log(this.enemies);
    }

    update_bullets() {


        this.projectiles.forEach(bullet => {

            if (bullet.age < 3) {
                bullet.track(this.enemies[0]);

            }


            bullet.update();


        });


        for (let i = this.projectiles.length - 1; i >= 0; i--) {
            let bullet = this.projectiles[i];


            //is colliding???
            if (rectangular_collision(bullet.target, bullet)) {
                this.projectiles.splice(i, 1);
                bullet.target.take_damage(2);
            }

            if (bullet.age >= 10) {
                this.projectiles.splice(i, 1);
            }

        }
    }


    handle_attack() {
        if (this.is_attacking) {

            if (this.should_attack === null) {
                this.should_attack = true;

                setTimeout(() => {
                    this.is_attacking = false;
                }, 400)
            } else


                if (this.last_action != 'attack_one' && this.last_action != 'attack_two') {
                    const possible_attacks = ["one", "two"];

                    let attack_chosen_by_the_gods = possible_attacks[Math.round(Math.random() * (possible_attacks.length - 1))];

                    let the_attack = `attack_${attack_chosen_by_the_gods}`;

                    this.switch_sprites(`attack_${attack_chosen_by_the_gods}`);

                    this.last_action = the_attack;

                }

            if (this.should_attack === true) {

                for (let i = 0; i < this.enemies.length; i++) {
                    let enemy = this.enemies[i];
                    if (rectangular_collision(this.attack_box, enemy) === true) {
                        //console.log(`${this.color} has attacked ${enemy.color}.`);
                        enemy.take_damage(this.damage_points);
                        this.should_attack = false;
                        break;
                        //console.log(`${enemy.color}'s hp = ${enemy.health_points}`)
                    } else {
                        //console.log(`${this.color} has missed their attack of ${enemy.color}.`);
                    }
                }


                // this.attack_box.visible = true;

            }


            /* setTimeout(() => {
                this.is_attacking = false;
            }, 500) */


        } else {
            //this.attack_box.visible = false;
        }
    }

    handle_death() {
        if (this.dead) {
            if (this.last_action != 'died') {

                console.log(`${this.name} has died`);
                this.last_action = 'died';
                this.switch_sprites('death');
            }

            if (this.move_right_died === null) {
                if (this.velocity.x > 0) {
                    this.move_right_died = true;
                } else {

                    this.move_right_died = true;
                }

            }

            if (this.move_right_died) {
                if (this.velocity.x <= 0.5) {
                    this.velocity.x = 0;
                } else {
                    this.velocity.x -= 0.03;
                }
            } else {
                if (this.velocity.x >= -0.5) {
                    this.velocity.x = 0;
                } else {
                    this.velocity.x += 0.03;
                }
            }



        }
    }

    reset_death() {
        this.dead = false;
        this.health_points = this.max_health_points;
        this.mana_points = this.max_mana_points;
        this.move_right_died = null;
        this.projectiles = [];
        this.fallen = false;
        this.last_action = 'idle';
        this.switch_sprites();
        this.sent_died_timeout = null;
        this.position = this.inital_position;
    }



    check_keys(pressed, code) {

        //console.log("code", code);

        if (pressed) {
            switch (code) {
                case this.config.mLeft:
                    if (this.last_action === 'run') {
                        this.velocity.x = -(this.base_agility + (this.base_agility * this.dash_multipler));
                        this.last_action = 'dash';

                    } else {
                        this.velocity.x = -this.base_agility;
                        this.last_action = 'run';

                    }
                    break;
                case this.config.mRight:
                    if (this.last_action != 'run' || this.last_action != 'dash') {
                        this.last_action = 'run';
                    }
                    if (this.last_action === 'run') {
                        this.velocity.x = this.base_agility + (this.base_agility * this.dash_multipler);
                        this.last_action = 'dash';

                    } else {
                        this.velocity.x = this.base_agility;
                        this.last_action = 'run';

                    }
                    break;
                case this.config.mUp:

                    const jump_multiplyer = 5;
                    if (this.last_action === 'dash') {
                        this.velocity.y = -(this.base_agility * jump_multiplyer * 2.5);

                    } else {
                        this.velocity.y = -(this.base_agility * jump_multiplyer);
                    }
                    if (this.last_action != "jump") {
                        this.last_action = 'jump';
                    }
                    break;
                case this.config.mDown:
                    this.gravity = (this.base_agility / 14);
                    break;
                case this.config.anchor:
                    this.gravity = (this.base_agility / 7);
                    console.log("reset gravity");
                    break;
                case this.config.attack_one:

                    if (!this.is_attacking) {
                        this.is_attacking = true;
                        this.should_attack = null;
                    }

                    break;
                case this.config.attack_two:
                    this.shoot();
                    break;

                default:
                    this.last_action = 'idle';
                    break;

            }
        } else {

            switch (code) {
                case this.config.mLeft:
                    this.velocity.x = 0;
                    break;
                case this.config.mRight:
                    this.velocity.x = 0;
                    break;
                default:
                    this.last_action = 'idle';
                    break;

            }

        }




    }

}



