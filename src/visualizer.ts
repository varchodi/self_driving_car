import { Level, NeuralNetwork } from "./network";
import { lerp } from "./util";

export class Visualizer{
    static drawNetwork(ctx: CanvasRenderingContext2D,network?: NeuralNetwork) {
        const margin = 50;
        const left = margin;
        const top = margin;
        const width = ctx.canvas.width - margin * 2;
        const hight = ctx.canvas.height - margin * 2;
        Visualizer.drawLevel(ctx, network?.levels[0]!, left, top, width, hight);
    }

    static drawLevel(ctx: CanvasRenderingContext2D, level: Level, left: number, top: number, width: number, height: number) {
        const right = left + width;
        const bottom = top + height;

        const nodeRadius = 18;

        //!! 0th layer of input layer
        for (let i = 0; i < level.input.length; i++){
            const x = lerp(left, right, level.input.length == 1 ? .5 : i / (level.input.length - 1));

            ctx.beginPath();
            ctx.arc(x, bottom, nodeRadius, 0, Math.PI * 2);
            ctx.fillStyle = "white";
            ctx.fill();

        }

        //!! output layer 
        for (let i = 0; i < level.outputs.length; i++){
            const x = lerp(left, right, level.outputs.length == 1 ? .5 : i / (level.input.length - 1));

            ctx.beginPath();
            ctx.arc(x, bottom, nodeRadius, 0, Math.PI * 2);
            ctx.fillStyle = "white";
            ctx.fill();

        }
    }
}