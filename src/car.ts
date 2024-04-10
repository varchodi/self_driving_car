import Controls from "./controls";
import Sensor from "./sensor";
import { polyIntersect } from "./util";

export default class Car {
    controls: Controls;
    speed: number;
    acceleration: number;
    maxSpeed: number;
    friction: number;
    angle: number;
    sensor?: Sensor;
    polygon: { x: number; y: number; }[];
    damages: boolean;

    constructor(public x: number, public y: number, public width: number, public height: number,public controlType:string,maxSpeed:number=3) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.speed = 0;
        this.acceleration = 0.2;
        this.maxSpeed = maxSpeed;
        this.friction = .05;

        this.angle = 0;
        //this.angle = Math.PI/2; //maybe better

        this.damages = false;

        //define sensors
        //remove sesnsor from traffic cars
        if (controlType !== "DUMMY") {
            this.sensor = new Sensor();
        }
        // add controls 
        this.controls = new Controls(controlType);

        this.polygon = [];

    }

    //update stuff while car control
    update(roadBoarder: {
        x: number;
        y: number;
    }[][],traffic:typeof this[]) {
        //?? if car not damaged ; can't move anymore ... (car stop)
        if (!this.damages) {
            
            this.#move();
            //update car poolygon on each move
            this.polygon = this.#createPolygon()
            this.damages = this.#assesssDamages(roadBoarder,traffic);
        }
        //?? update sensors if avalaible
        if (this.sensor) this?.sensor.update(this.x, this.y, this.angle, roadBoarder,traffic);
    }

    #assesssDamages(roadBoarder: Array<typeof this.polygon>,traffic:Car[]): boolean {
        for (let i = 0; i < roadBoarder.length; i++) {
                if (polyIntersect([...this.polygon, this.polygon[0]], roadBoarder[i])) {
                return true;
            }
        }

        //intersect with traffic cars 
        for (let i = 0; i < traffic.length; i++) {
            const poly = traffic[i].polygon;
            if (polyIntersect([...this.polygon, this.polygon[0]], [...poly,poly[0]])) {
            return true;
        }
    }
        return false;
    }

    #createPolygon() {
        /*
        this function used to create a polygon around the car
        it will be usefull in collition detector

        rad:    half of the diagonal of the car
        alpha : angle 
        */

        const points = [];
        const rad = Math.hypot(this.width, this.height) / 2;
        const alpha = Math.atan2(this.width, this.height);

        //point for each corder of the car ...
        // t-r
        points.push({
            // x and y , from coversion of polar coordinates top cartesian
            x: this.x - Math.sin(this.angle - alpha) * rad,
            y: this.y - Math.cos(this.angle - alpha) * rad
        });
        // t-l
        points.push({
            // x and y , from coversion of polar coordinates top cartesian
            x: this.x - Math.sin(this.angle + alpha) * rad,
            y: this.y - Math.cos(this.angle + alpha) * rad
        });
        // b-r
        points.push({
            // x and y , from coversion of polar coordinates top cartesian
            x: this.x - Math.sin(Math.PI + this.angle - alpha) * rad,
            y: this.y - Math.cos(Math.PI + this.angle - alpha) * rad
        });
        // b-l
        points.push({
            // x and y , from coversion of polar coordinates top cartesian
            x: this.x - Math.sin(Math.PI + this.angle + alpha) * rad,
            y: this.y - Math.cos(Math.PI + this.angle + alpha) * rad
        });

        return points;

    }
    //move
    #move() {
        //< n > affect only speed 
        if (this.controls.forward) {
            this.speed += this.acceleration;
        }
        if (this.controls.reverse) {
            this.speed -= this.acceleration;
        }

        //?? this upper if is to handle reverse turning .../.
        if (this.speed != 0) {
            const flip = this.speed > 0 ? 1 : -1;

            //this other 2 affects angle
            if (this.controls.left) {
                this.angle += .03 * flip;
            }
            if (this.controls.right) {
                this.angle -= .03 * flip;
            }
        }

        //speed stuffs ...
        if (this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed;
        }
        if (this.speed <= -this.maxSpeed / 2) {
            this.speed = - this.maxSpeed / 2;
        }

        //fr
        if (this.speed > 0) {
            this.speed -= this.friction;
        }
        if (this.speed < 0) {
            this.speed += this.friction;
        }

        if (Math.abs(this.speed) < this.friction) {
            this.speed = 0;
        }
        //?? for rotation 
        this.x -= Math.sin(this.angle) * this.speed;
        this.y -= Math.cos(this.angle) * this.speed;
        //this.y -= this.speed;
    }

    public draw(ctx: CanvasRenderingContext2D) {
        if (this.damages) {
            ctx.fillStyle = "gray";
        } else {
            ctx.fillStyle = "black"
        }
        ctx.beginPath();
        //let's now draw the polygon in the car place
        ctx.moveTo(this.polygon[0].x, this.polygon[0].y);
        for (let i = 1; i < this.polygon.length; i++) {
            ctx.lineTo(this.polygon[i].x, this.polygon[i].y);
        }
        ctx.fill();

        //drw sensors
       if (this.sensor) this.sensor.draw(ctx);
    }
}
