class Sprite extends Rectangle {


    //iv
    velocity = {
        x: 0,
        y: 0
    }

    image = null;
    image_loaded = false;

    last_action = null;
    sent_died_timeout = null;

    //c
    constructor({
        color = "red",
        x = 0,
        y = 0,
        offset = null,
        imgSrc = '',
        col = 1,
        row = 1,
        width = 100,
        height = 200,
        scale = 1,
        buffer = 1
    }) {

        super({
            color: "red",
            position: {
                x: x,
                y: y
            },
            offset: {
                x: 0,
                y: 0
            },
            width: width,
            height: height
        })

        if (offset === null) {
            this.offset = {
                x: 0,
                y: 0
            };
        } else {
            this.offset = offset;
        }


        this.color = color;
        this.position.x = x;
        this.position.y = y;


        this.gravity = 0.8;

        this.scale = scale;

        
            this.reset_image(imgSrc, col, row, buffer);


        this.fallen = false;
    }


    //a

    //m

    reset_image(imgSrc, col = 1, row = 1, buffer = 1) {
        this.image = new Image();
        this.image.src = imgSrc;
        this.buffer = buffer;
        this.col = col;
        this.row = row;
        this.total_frame = 0;
        this.buffer = buffer;
        this.current_frame = 0;

        this.image.onload = () => {
            this.image_loaded = true;
            //console.log(`drawing this first:${imgSrc}`)
        }

    }

    //p

    restrictFrame() {
        let buffer = 0.001;
        if (this.position.x < 0) {
            this.velocity.x = 0;
            this.position.x = buffer;
        }
        if (this.position.y < 0) {
            this.position.y = 0;
            this.velocity.y = 0;
        }

        if (this.right() >= canvas.width) {
            this.position.x = canvas.width - this.width - buffer;
        }
    }

    //aux
    update() {

        this.total_frame++;
        let temp = this.current_frame;
        if (this.total_frame % this.buffer == 0) {
            this.current_frame = this.total_frame % this.col;
        }


        //only true when the animation looops bacckk around,,,  last frame Z back to frame A then fram B up until Z again.....
        if (temp >= this.current_frame) {
            if (this.last_action == 'attack_one' || this.last_action == 'attack_two') {
                //this is when the attack ends.
                this.is_attacking = false;
            } else if (this.last_action == 'died') {
                this.current_frame = temp;

                
                console.log("this was", this.name);
                if (this.sent_died_timeout === null) {
                    setTimeout(() => {
                        this.fallen = true;
                        console.log("this is", this.name);
                    }, 2000);
                    this.sent_died_timeout = true;
                }

            }



        }




        if (this.image === null) {
            super.update();
        } else {

            const eaglevision = false;
            if (eaglevision)
                super.update();
            if (this.image_loaded) {
                c.drawImage(
                    this.image,
                    this.current_frame * (this.image.width / this.col),
                    0,
                    this.image.width / this.col,
                    this.image.height / this.row,
                    this.position.x - this.offset.x,
                    this.position.y - this.offset.y,
                    (this.image.width / this.col) * this.scale,
                    this.image.height * this.scale
                );


            }
        }


        this.restrictFrame();
    }


}
