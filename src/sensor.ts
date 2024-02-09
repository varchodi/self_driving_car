import { getIntersection, lerp } from "./util";

export default class Sensor{
    rayCount: number;
    rayLength: number;
    raySread: number;
    rays: {x:number,y:number}[][];
    readings: { x: number; y: number; offset: number; }[];
    constructor() {
        this.rayCount =50;
        this.rayLength = 200;
        this.raySread = Math.PI /2;
        this.rays = [];
        this.readings = [];
    }

    update(x:number,y:number,angle:number,roadBoarders: {
        x: number;
        y: number;
    }[][] ) {
        this.castRays(x,y,angle);
        this.readings = [];
        for (let i = 0; i < this.rays.length; i++){
            this.readings.push(
                this.getReading(this.rays[i], roadBoarders)!
            );
        }
    }

    private getReading(ray:{x:number,y:number}[],roadBoarders:{
        x: number;
        y: number;
    }[][])
    {
        let touches: { x: number; y: number; offset: number; }[] = [];
        roadBoarders.forEach(boarder => {
            for (let i = 1; i < boarder.length; i++) {
                const touch = getIntersection(
                    ray[0],
                    ray[1],
                    boarder[i-1],
                    boarder[i]
                );
                if (touch) {
                    touches.push(touch);
                }
            }
            });

        if (touches.length === 0) {
            return null;
        } else {
            const offsets = touches.map(e => e.offset);
            const minOffset = Math.min(...offsets);
            return touches.find(e => e.offset == minOffset); 
        }
    }

    private castRays(x:number,y:number,angle:number) {
        this.rays = [];
        for (let i = 0; i < this.rayCount; i++){
            const rayAngle = lerp(
                this.raySread / 2,
                -this.raySread / 2,
                this.rayCount==1?.5:i / (this.rayCount - 1)
            )+angle;

            const start = { x, y };
            const end = {
                x:x - Math.sin(rayAngle) * this.rayLength,
                y:y - Math.cos(rayAngle) * this.rayLength
            };
            this.rays.push([start, end]);
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        for (let i = 0; i < this.rayCount; i++){
            let end = this.rays[i][1];
            if (this.readings[i]) {
                end = this.readings[i];
            }
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "yellow";
            ctx.moveTo(
                this.rays[i][0].x,
                this.rays[i][0].y
            );
            ctx.lineTo(
                end.x,
                end.y
            );
            ctx.stroke();

            //continuation part ....
            // ctx.strokeStyle = "black";
            // ctx.moveTo(
            //     this.rays[i][1].x,
            //     this.rays[i][1].y
            // );
            // ctx.lineTo(
            //     end.x,
            //     end.y
            // );

            // ctx.stroke();
        }
    }
}

