import Car from './car';
import './styles/style.css'
import Road from './road';
import { Visualizer } from './visualizer';

const carCanvas = document.getElementById("carCanvas") as HTMLCanvasElement;
const networkCanvas = document.getElementById("networkCanvas") as HTMLCanvasElement;

carCanvas.height = window.innerHeight;
carCanvas.width = 200;

networkCanvas.height = window.innerHeight;
networkCanvas.width = 450;

const carCtx = carCanvas.getContext("2d") as CanvasRenderingContext2D;
const networkCtx = networkCanvas.getContext("2d") as CanvasRenderingContext2D;


const road = new Road(carCanvas.width / 2, carCanvas.width *0.9);
const N = 100;
const cars = generateCars(N);
//add controlType prop to car
// const car = new Car(100, 100, 30, 50,"AI");

const traffic = [
    new Car(100, -100, 30, 50,"DUMMY",2)
];
//??best car 

let bestCar = cars[0];
//! load previous bestcar Brain from localStorage
bestCar.brain = JSON.parse(localStorage.getItem("bestBrain")!);
if (localStorage.getItem("bestBrain")) {
}

//animate ...
animate();


function animate() {

    for (let i = 0; i < traffic.length; i++){
        traffic[i].update([],[]);
    }

    //update cars(Ai cars tho)
    for (let i = 0; i < cars.length; i++){
        
        cars[i].update(road.boarders,traffic);
    }

    //?? car with minimun Y value 
    bestCar = cars.find(c => c.y == Math.min(...cars.map(c => c.y)))!;

    //??moved up ...
    //this one reset the size (height of canvas when windows resized)
    // and it also clear the canvas on car move ?? maybe 
    carCanvas.height = window.innerHeight;

    carCanvas.height = window.innerHeight;
    networkCanvas.height = window.innerHeight;
    
    //?? make camera move with the car
    carCtx.translate(0, -bestCar.y+carCanvas.height*.7); 

    road.draw(carCtx); //draw road marks ...

    // draw traffic (cars others)
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(carCtx);
    }
    //?? make other cars transparents 
    carCtx.globalAlpha = 0.2; 
    for (let i = 0; i < cars.length; i++) {
        cars[i].draw(carCtx);
    }
    carCtx.globalAlpha = 1;
     bestCar.draw(carCtx,true);

    // show car nn network (for the first one only)
    Visualizer.drawNetwork(networkCtx, bestCar?.brain!);
    //?? this one call animate func as many of possible , in continious 
    requestAnimationFrame(animate);
}

function generateCars(N:number):Car[] {
    const cars: Car[] = [];
    for (let i = 1; i <=N; i++) {
        cars.push(new Car(100, 100, 30, 50, "AI"));
    }
    return cars;
}

//??
function save() {
    localStorage.setItem("bestBrain", JSON.stringify(bestCar.brain));
}

function discard() {
    localStorage.removeItem("bestBrain");
}
