import { Level, NeuralNetwork } from "./network";
import { getRGBA, lerp } from "./util";

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
        const {input,outputs,weights,biases } = level;
        const nodeRadius = 18;
        
        //draw connections;
        for (let i = 0; i < input.length; i++) {
            for (let j = 0; j < outputs.length; j++) {
                ctx.beginPath();
                ctx.moveTo(Visualizer.getNodeX(input, i, left, right), bottom);
                ctx.lineTo(this.getNodeX(outputs, j, left, right), top);
                ctx.lineWidth = 2;
                const value = weights[i][j];
                ctx.strokeStyle = getRGBA(value);
                ctx.stroke();

            }
            
        }

        //!! 0th layer of input layer
        for (let i = 0; i < input.length; i++){
            const x = Visualizer.getNodeX(input, i, left, right);

            //for styling (2 arcs ) ??
            ctx.beginPath();
            ctx.arc(x, bottom, nodeRadius, 0, Math.PI * 2);
            ctx.fillStyle = "black";
            ctx.fill();

            ctx.beginPath();
            ctx.arc(x, bottom, nodeRadius, 0.6, Math.PI * 2);
            ctx.fillStyle = getRGBA(input[i]);
            ctx.fill();

        }

        //!! output layer 
        for (let i = 0; i < outputs.length; i++){
            const x = Visualizer.getNodeX(outputs, i, left, right);

            ctx.beginPath();
            ctx.arc(x, top, nodeRadius, 0.6, Math.PI * 2);
            ctx.fillStyle = "black";
            ctx.fill();

            ctx.beginPath();
            ctx.arc(x, top, nodeRadius, 0.8, Math.PI * 2);
            ctx.fillStyle = getRGBA(outputs[i]);
            ctx.fill();

            //display biases
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.arc(x, top, nodeRadius, 0, Math.PI * 2);
            ctx.strokeStyle = getRGBA(biases[i]);
            ctx.stroke();

        }

    }

    private static getNodeX(nodes: any, index: number, left: number, right: number) {
        return lerp(left,right,nodes.length==1?.5:index/(nodes.length-1))
    }
}