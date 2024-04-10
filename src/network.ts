
class Level{
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

    static feedForward(givenInput: Array<number>, level: Level) {
        level.input = [...givenInput]
        //or
        // for (let i = 0; i < level.input.length; i++) {
        //     level.input[i] = givenInput[i];
            
        // }

        for (let i = 0; i < level.outputs.length; i++) {
            let sum = 0;
            for (let j = 0; j < level.input.length; j++) {
                sum += level.input[j]*level.weights[j][i];
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