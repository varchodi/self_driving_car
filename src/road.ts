import { lerp } from "./util";

export default class Road{
    left: number;
    right: number;
    top: number;
    bottom: number;
    constructor(public x: number, public width: number,public laneCount:number=3) {
        this.x = x;
        this.width = width;
        this.laneCount = laneCount;
        this.left = x - width / 2;
        this.right = x + width / 2;

        const infinity = 1000000;
        this.top = -infinity;
        this.bottom = infinity;
    };


    //center lane (put car at a given lane ...) 
    getLaneCenter(laneIndex: number) {
        const laneWidth = this.width / this.laneCount;
        return this.left + laneWidth / 2 +
            Math.min(laneIndex ,this.laneCount-1)* laneWidth;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'white';

        //interpolation to find x poinst between two points
        //used it to draw indides rads bands ,,
        for (let i = 0; i <= this.laneCount; i++) {
            const x = lerp(
                this.left,
                this.right,
                i/this.laneCount
            )
            //?? line dash 
            if (i > 0 && i<this.laneCount) {
                ctx.setLineDash([20, 20]);
            } else {
                ctx.setLineDash([]);
            }
            ctx.beginPath();
            ctx.moveTo(x, this.top);
            ctx.lineTo(x, this.bottom);
            ctx.stroke();
        }


    }
}
