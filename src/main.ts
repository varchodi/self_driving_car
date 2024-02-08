import Car from './car';
import './styles/style.css'

const myCanvas = document.getElementById("myCanvas") as HTMLCanvasElement;

myCanvas.height = window.innerHeight;
myCanvas.width = 200;


const ctx = myCanvas.getContext("2d") as CanvasRenderingContext2D;

const car = new Car(100, 100, 30, 50);
car.draw(ctx);
