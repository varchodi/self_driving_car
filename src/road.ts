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

    draw(ctx: CanvasRenderingContext2D) {
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'white';
        ctx.beginPath();
        ctx.moveTo(this.left, this.top);
        ctx.lineTo(this.left, this.bottom);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(this.right, this.top);
        ctx.lineTo(this.right, this.bottom);
        ctx.stroke();
    }
}