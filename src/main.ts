import Car from './car';
import Road from './road';
import './styles/style.css'

const myCanvas = document.getElementById("myCanvas") as HTMLCanvasElement;

myCanvas.height = window.innerHeight;
myCanvas.width = 200;


const ctx = myCanvas.getContext("2d") as CanvasRenderingContext2D;

const car = new Car(100, 100, 30, 50);

const road = new Road(myCanvas.width / 2, myCanvas.width *0.9);

//animate ...
animate();


function animate() {
    //this one reset the size (height of canvas when windows resized)
    // and it also clear the canvas on car move ?? maybe 
    myCanvas.height = window.innerHeight;
    car.update();
    road.draw(ctx); //draw road marks ...
    car.draw(ctx);
    //?? this one call animate func as many of possible , in continious 
    requestAnimationFrame(animate);
}
