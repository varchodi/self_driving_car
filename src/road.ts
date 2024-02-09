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
        this.left = x - width / 4;
        this.right = x + width / 4;

        const infinity = 1000000;
        this.top = -infinity;
        this.bottom = infinity;

        const topLeft = { x: this.left, y: this.top };
        const bottomLeft = { x: this.left, y: this.bottom }; 
        const topRight = { x: this.right, y: this.top };
        const bottomRight = { x: this.right, y: this.bottom };
        //be used for coll detectors
        this.boarders = [
            [topLeft],
            [topRight]
        ];
        //?? add more points (where road is curved )
        for (let y = -1000; y <=0; y++) {
            const x = Math.sin(y*.01)*50;
            this.boarders[0].push({ x: x + this.left, y: y });
            this.boarders[1].push({ x: x + this.right, y: y });
        }

        this.boarders[0].push(bottomLeft);
        this.boarders[1].push(bottomRight);
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

        /*
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
        */

        //reset linedashes
        ctx.setLineDash([]);
        this.boarders.forEach(border => {
            ctx.beginPath();
            ctx.moveTo(border[0].x, border[0].y);
            for (let i = 1; i < border.length; i++){
                
                ctx.lineTo(border[i].x, border[i].y);
            }
            ctx.stroke();
        })
    }
}
