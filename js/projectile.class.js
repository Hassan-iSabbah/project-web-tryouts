class Projectile extends Rectangle {

    //iv
    velocity = {
        x: 0,
        y: 0
    }

    gravity_mode;

    target;

    //in seconds   average timespan 10 sec
    age;

    speed_multiplyer;
    //c


    constructor({
        color = "white",
        x = 0,
        y = 0,
        offset =
        {
            x: 0,
            y: 0
        },
        radius = 4,
        gravity_mode = false,
        speed_multiplyer = 2
    }) {
        //constructor starts 
        super({
            color: color,
            position: {
                x: x,
                y: y
            },
            offset: offset,
            round: true,
            width: radius,
            height: radius
        })

        if (offset === null) {
            this.offset = {
                x: 0,
                y: 0
            };
        } else {
            this.offset = offset;
        }

        //string

        this.color = color;

        //int

        //float
        this.position.x = x;
        this.position.y = y;

        this.speed_multiplyer = speed_multiplyer;

        this.gravity = 0.001;
        //object types


        this.gravity_mode = gravity_mode;

        this.target = null;

        this.age = 0;

        setInterval(() => {
            this.age++;
        }, 1000);
    }

    //a


    //m


    //p


    //aux

    update() {
        super.update();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.gravity_mode) {
            if (this.position.y + this.height < canvas.height) {
                this.velocity.y += this.gravity;
            } else {
                this.velocity.y = 0;
                this.position.y = canvas.height - this.height;
                this.gravity = 0.001;
            }
        }


    }


    track(target) {
        if (this.target === null) {
            this.target = target;
        }

        let disX = this.position.x - (this.target.position.x + (this.target.width / 2));
        let disY = this.position.y - (this.target.position.y + (this.target.height / 2));

        let angle = Math.atan2(disX, disY);

        this.velocity.y = -(Math.cos(angle) * this.speed_multiplyer);
        this.velocity.x = - Math.sin(angle) * this.speed_multiplyer;
    }

}

