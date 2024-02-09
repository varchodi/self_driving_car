import Car from "./car";
import { lerp } from "./util";

export default class Sensor{
    car: Car;
    rayCount: number;
    rayLength: number;
    raySread: number;
    rays: {x:number,y:number}[][];
    constructor(car: Car) {
        this.car = car;
        this.rayCount =50;
        this.rayLength = 200;
        this.raySread = Math.PI /2;
        this.rays=[]
    }

    update() {
        this.rays = [];
        for (let i = 0; i < this.rayCount; i++){
            const rayAngle = lerp(
                this.raySread / 2,
                -this.raySread / 2,
                this.rayCount==1?.5:i / (this.rayCount - 1)
            )+this.car.angle;

            const start = { x: this.car.x, y: this.car.y };
            const end = {
                x: this.car.x - Math.sin(rayAngle) * this.rayLength,
                y: this.car.y - Math.cos(rayAngle) * this.rayLength
            };
            this.rays.push([start, end]);
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        for (let i = 0; i < this.rayCount; i++){
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "yellow";
            ctx.moveTo(
                this.rays[i][0].x,
                this.rays[i][0].y
            );
            ctx.lineTo(
                this.rays[i][1].x,
                this.rays[i][1].y
            );
            ctx.stroke();
        }
    }
}