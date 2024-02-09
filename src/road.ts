import { lerp } from "./util";

export default class Road{
    left: number;
    right: number;
    top: number;
    bottom: number;
    boarders: { x: number; y: number; }[][];
    constructor(public x: number, public width: number,public laneCount:number=3) {
        this.x = x;
        this.width = width;
        this.laneCount = laneCount;
        this.left = x - width / 2;
        this.right = x + width / 2;

        const infinity = 1000000;
        this.top = -infinity;
        this.bottom = infinity;

        const topLeft = { x: this.left, y: this.top };
        const bottomLeft = { x: this.left, y: this.bottom }; 
        const topRight = { x: this.right, y: this.top };
        const bottomRight = { x: this.right, y: this.bottom };
        //be used for coll detectors
        this.boarders = [
            [topLeft, bottomLeft],
            [topRight,bottomRight]
        ]
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
        ctx.setLineDash([20, 20]);
        for (let i = 1; i <= this.laneCount-1; i++) {
            const x = lerp(
                this.left,
                this.right,
                i/this.laneCount
            )
           
            ctx.beginPath();
            ctx.moveTo(x, this.top);
            ctx.lineTo(x, this.bottom);
            ctx.stroke();
        }

        //reset linedashes
        ctx.setLineDash([]);
        this.boarders.forEach(border => {
            ctx.beginPath();
            ctx.moveTo(border[0].x, border[0].y);
            ctx.lineTo(border[1].x, border[1].y);
            ctx.stroke();
        })
    }
}
