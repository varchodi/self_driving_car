export default class Car{

    constructor(public x:number, public y:number,public width:number,public height:number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
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