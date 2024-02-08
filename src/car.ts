import Controls from "./controls";

export default class Car{
    controls: Controls;
    speed: number;
    acceleration: number;
    maxSpeed: number;
    friction: number;
    angle: number;

    constructor(public x:number, public y:number,public width:number,public height:number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.speed = 0;
        this.acceleration = 0.2;
        this.maxSpeed = 3;
        this.friction = .05;

        this.angle =0;
        //this.angle = Math.PI/2; //maybe better 
        
        this.controls = new Controls();

    }

    //update stuff while car control
    update() {
        //< n > affect only speed 
        if (this.controls.forward) {
            this.speed += this.acceleration;
        }
        if (this.controls.reverse) {
            this.speed -= this.acceleration;
        }

        //?? this upper if is to handle reverse turning .../.
        if (this.speed != 0) {
            const flip = this.speed > 0 ? 1 : -1;
            
                    //this other 2 affects angle
                    if (this.controls.left) {
                        this.angle += .03*flip;
                    }
                    if (this.controls.right) {
                        this.angle -= .03*flip;
                    }
        }
            
        //speed stuffs ...
        if (this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed;
        }
        if (this.speed <= -this.maxSpeed / 2) {
            this.speed =- this.maxSpeed / 2;
        }

        //fr
        if (this.speed > 0) {
            this.speed -= this.friction; 
        }
        if (this.speed < 0) {
            this.speed += this.friction;
        }

        if (Math.abs(this.speed) < this.friction) {
            this.speed = 0;
        }
        //?? for rotation 
        this.x -= Math.sin(this.angle) * this.speed;
        this.y -= Math.cos(this.angle) * this.speed;
        //this.y -= this.speed;
    }

    public draw(ctx: CanvasRenderingContext2D) {
        //?? for rotation
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(-this.angle);

        ctx.beginPath();
        ctx.rect(
            - this.width / 2,
            - this.height / 2,
            this.width,
            this.height
        );
        ctx.fill();
        ctx.restore();
    }
}