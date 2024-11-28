class Rectangle {

    //iv
    position = {};
    width;
    height;
    color;
    round;
    visible;


    //c
    constructor({
        position = null,
        offset = null,
        color = "red",
        width = 100,
        height = 200,
        round = false
    }) {

        //construtor begins
        if (position === null) {
            this.position = {
                x: 0,
                y: 0
            };
        } else {
            this.position = position;
        }

        if (offset === null) {
            this.offset = {
                x: 0,
                y: 0
            };
        } else {
            this.offset = offset;
        }

        this.color = color;
        this.width = width;
        this.height = height;
        this.visible = true;
        this.round = round;




        //construtor ends
    }


    //a

    left() {
        return this.position.x;
    }
    right() {
        return this.position.x + this.width;
    }

    up() {
        return this.position.y;
    }


    bottom() {
        return this.position.y + this.height;
    }
    //m


    //aux
    draw() {

        keep_whole(
            () => this.width,
            (value) => this.width = value
        );

        keep_whole(
            () => this.height,
            (value) => this.height = value
        );

        if (this.visible) {
            if (this.round) {
                drawc({
                    color: this.color,
                    x: this.position.x,
                    y: this.position.y,
                    s: this.width

                });

            } else {

                draw({
                    color: this.color,
                    x: this.position.x,
                    y: this.position.y,
                    w: this.width,
                    h: this.height

                });
            }
        }
    }


    update() {
        this.draw();
    }



}
