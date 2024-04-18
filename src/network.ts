import { lerp } from "./util";

export class NeuralNetwork{
    levels : Level[];
    constructor(public neuronCounts: number[]) {
        this.levels = [];
        for (let i = 0; i < neuronCounts.length-1; i++) {
            this.levels.push(new Level(
            neuronCounts[i],neuronCounts[i+1]
        ))
        }
    }

    static feedForward(givenInputs:number[], network: NeuralNetwork):number[] {
        let outputs = Level.feedForward(givenInputs, network.levels[0]);

        for (let i = 0; i < network.levels.length; i++) {
            outputs =Level.feedForward(outputs,network.levels[i]);
        }
        return outputs;
    }

    //?? update weights and biases to the best ones 
    static mutate(network: NeuralNetwork, amount: number = 1) {
        // network.levels.forEach(level => {
        //     for (let i = 0; i < level.biases.length; i++) {
        //         level.biases[i] = lerp(
        //             level.biases[i],
        //             Math.random() * 2 - 1,
        //             amount
        //         )
        //     }
        //     for (let i = 0; level.weights.length; i++){
        //         // for (let j = 0; j < level.weights[i].length; j++){
        //         //     level.weights[i][j] = lerp(
        //         //         level.weights[i][j],
        //         //         Math.random() * 2 - 1,
        //         //         amount
        //         //     )
        //         // }
        //         console.log(level.weights[i].length-1)
        //     }
        // })

        network.levels.forEach(level => {
			for (let i = 0; i < level.biases.length; i++) {
				level.biases[i] = lerp(
					level.biases[i],
					Math.random()*2-1,
					amount
				)
			}
			for (let i = 0; i < level.weights.length; i++) {
				for (let j = 0; j < level.weights[i].length; j++) {
					level.weights[i][j] = lerp(
						level.weights[i][j],
						Math.random() * 2 - 1,
						amount
					)
				}				
			}
		})
	
    }
}
export class Level{
    input: number[];
    outputs: number[];
    biases: number[];
    weights: number[][];
    constructor(public inputCount:number, public outputCount:number) {
        //layer structure
        this.input = new Array(inputCount);
        this.outputs = new Array(outputCount);
        this.biases = new Array(outputCount);
        
        this.weights = []; // matrix 
        for (let i = 0; i < inputCount; i++) {
            this.weights[i] = new Array(outputCount);
        }

        Level.randomize(this);
    }

    //randomize n initialize weights and biases
    private static randomize(level: Level) {
        for (let i = 0; i < level.input.length; i++) {
            for (let j = 0; j < level.outputs.length; j++) {
                //init weights with ran values 
                level.weights[i][j] = Math.random() * 2 - 1;
            }

        }
        //init biases array
        for (let i = 0; i < level.biases.length; i++) {
            level.biases[i] = Math.random() * 2 - 1;
        }
    }

    static feedForward(givenInput: Array<number>, level: Level):number[] {
        //level.input = [...givenInput]
        //or
        for (let i = 0; i < level.input.length; i++) {
            level.input[i] = givenInput[i];
            
        }

        for (let i = 0; i < level.outputs.length; i++) {
            let sum = 0;
            for (let j = 0; j < level.input.length; j++) {
                 sum += level.input[j]*level.weights[j][i];
                // console.log(level.weights[5][0])
            }

            if (sum > level.biases[i]) {
                level.outputs[i] = 1;
            } else {
                level.outputs[i] = 0;
            }
        }
        return level.outputs;
    }
}