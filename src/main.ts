import Car from './car';
import Road from './road';
import './styles/style.css'
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
//add controlType prop to car
const car = new Car(100, 100, 30, 50,"AI");

const traffic = [
    new Car(100, -100, 30, 50,"DUMMY",2)
];

//animate ...
animate();


function animate() {

    for (let i = 0; i < traffic.length; i++){
        traffic[i].update([],[]);
    }

    //??moved up ...
    car.update(road.boarders,traffic);
    //this one reset the size (height of canvas when windows resized)
    // and it also clear the canvas on car move ?? maybe 
    carCanvas.height = window.innerHeight;

    carCanvas.height = window.innerHeight;
    networkCanvas.height = window.innerHeight;
    
    //?? make camera move with the car
    carCtx.translate(0, -car.y+carCanvas.height*.7); 

    road.draw(carCtx); //draw road marks ...

    // draw traffic (cars others)
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(carCtx);
    }
    car.draw(carCtx);

    // show car nn network 
    
    Visualizer.drawNetwork(networkCtx, car.brain);
    //?? this one call animate func as many of possible , in continious 
    requestAnimationFrame(animate);
}
