import Car from './car';
import Road from './road';
import './styles/style.css'

const myCanvas = document.getElementById("myCanvas") as HTMLCanvasElement;

myCanvas.height = window.innerHeight;
myCanvas.width = 200;


const ctx = myCanvas.getContext("2d") as CanvasRenderingContext2D;

const road = new Road(myCanvas.width / 2, myCanvas.width *0.9);

const car = new Car(100, 100, 30, 50);


//animate ...
animate();


function animate() {
    //??moved up ...
    car.update(road.boarders);
    //this one reset the size (height of canvas when windows resized)
    // and it also clear the canvas on car move ?? maybe 
    myCanvas.height = window.innerHeight;
    //?? make camera move with the car 
    ctx.translate(0, -car.y+myCanvas.height*.7); 

    road.draw(ctx); //draw road marks ...
    car.draw(ctx);

    //?? this one call animate func as many of possible , in continious 
    requestAnimationFrame(animate);
}
