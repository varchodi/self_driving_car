import Controls from "./controls";

export default class Car{
    controls: Controls;
    speed: number;
    acceleration: number;
    maxSpeed: number;
    friction: number;

    constructor(public x:number, public y:number,public width:number,public height:number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.speed = 0;
        this.acceleration = 0.2;
        this.maxSpeed = 3;
        this.friction = .05;
        
        this.controls = new Controls();

    }

    //update stuff while car control
    update() {
        if (this.controls.forward) {
            this.speed += this.acceleration;
        }
        if (this.controls.reverse) {
            this.speed -= this.acceleration;
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
        this.y -= this.speed;
    }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.rect(
            this.x - this.width / 2,
            this.y - this.height / 2,
            this.width,
            this.height
        );
        ctx.fill();
    }
}