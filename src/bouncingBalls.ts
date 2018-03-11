import {CanvasCanvas} from "./canvasCanvas";
import {Listener} from "./listener";
import {Canvas, CanvasConstructor} from "./svgCanvas";
import {MathUtils, queryParams} from "./utils";
import {Ball} from "./ball";
import {Game, GameAction, GameRenderer, GameUpdater, Vector} from "./game";

export interface BouncingBall extends Ball {
    
    readonly radius: number; // must be a circle for collisions
    
    readonly minBounceInterval: number;
    
    readonly initialSpeed: number;
    readonly initialAngle: number;
    
    readonly speed: number;
    readonly angle: number;
    
    readonly lastXBounceTick: number;
    readonly lastYBounceTick: number;
    readonly numBounces: number;
    
}

interface PrivateBouncingBall {
    
    initialSpeed: number;
    initialAngle: number;
    
    x: number;
    y: number;
    
    speed: number;
    angle: number;
    
    lastXBounceTick: number;
    lastYBounceTick: number;
    numBounces: number;
    
}

export interface BouncingBallOptions {
    
    id: number,
    minBounceInterval?: number;
    position: () => Vector;
    radius: () => number;
    velocity: () => Vector;
    
}

export const BouncingBall = {
    
    new(options: BouncingBallOptions): BouncingBall {
        
        if (!options.minBounceInterval) {
            options.minBounceInterval = 2; // default
        }
        
        const reset = function(game: Game): void {
            const velocity: Vector = options.velocity();
            privateBall.initialSpeed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
            privateBall.initialAngle = Math.atan2(velocity.y, velocity.x);
            
            const position: Vector = options.position();
            privateBall.x = position.x;
            privateBall.y = position.y;
            
            privateBall.speed = privateBall.initialSpeed;
            privateBall.angle = privateBall.initialAngle;
            
            privateBall.lastXBounceTick = 0;
            privateBall.lastYBounceTick = 0;
            privateBall.numBounces = 0;
        };
        
        const minBounceInterval: number = options.minBounceInterval | 0;
        const radius: number = +options.radius();
        
        const dist2 = function(ball1: Ball, ball2: Ball) {
            // "use asm";
            const dx: number = +ball1.x - +ball2.x;
            const dy: number = +ball1.y - +ball2.y;
            return dx * dx + dy * dy;
        };
        
        const collide: GameUpdater = function(game: BouncingBallsGame): void {
            // "use asm";
            const balls: BouncingBall[] = game.balls;
            for (let i = ball.ballId | 0; i < (balls.length | 0); i++) {
                const otherBall: BouncingBall = balls[i];
                const radiusSum: number = +(+radius + +otherBall.radius);
                if (dist2(ball, otherBall) <= radiusSum * radiusSum) {
                    // assume equal mass
                    // TODO collide
                }
            }
        };
        
        const move: GameUpdater = function(game: Game): void {
            // "use asm";
            const canvas: Canvas = game.canvas;
            const width: number = +canvas.width;
            const height: number = +canvas.height;
            let x: number = +ball.x;
            let y: number = +ball.y;
            let angle: number = +ball.angle;
            const xBounce: boolean = x < radius || x > width - radius;
            const yBounce: boolean = y < radius || y > height - radius;
            const tick: number = game.tick | 0;
            if (tick - ball.lastXBounceTick > minBounceInterval && xBounce) {
                angle = -(Math.PI + angle) % MathUtils.TAU;
                privateBall.lastXBounceTick = tick;
            } else if (tick - ball.lastYBounceTick > minBounceInterval && yBounce) {
                angle = -angle;
                privateBall.lastYBounceTick = tick;
            }
            if (xBounce || yBounce) {
                privateBall.numBounces++;
            }
            
            // fail safe to rescue balls off screen
            if (tick % 16 === 0) {
                if (x < 0) {
                    x = radius;
                }
                if (x > width) {
                    x = width - radius;
                }
                if (y < 0) {
                    y = radius;
                }
                if (y > height) {
                    y = height - radius;
                }
            }
            
            // super fail safe, reset to center
            // usually happens at extreme speeds, so not noticeable really
            if (tick % 64 === 0) {
                if (x < 0 || x > width) {
                    console.log("super fail safe");
                    x = width / 2;
                }
                if (y < 0 || y > height) {
                    console.log("super fail safe");
                    y = height / 2;
                }
            }
            
            const speed: number = +ball.speed;
            const delta: number = +1; // this.delta * 0.01;
            x += speed * Math.cos(angle) * delta;
            y += speed * Math.sin(angle) * delta;
            
            privateBall.angle = angle;
            privateBall.x = x;
            privateBall.y = y;
        };
        
        const update: GameUpdater = function(game: Game): void {
            move(game);
            collide(game);
        };
        
        const render: GameRenderer = function(game: Game): void {
            game.canvas.fillCircle(ball.x, ball.y, radius);
        };
        
        const ball: BouncingBall = {
            
            ballId: options.id, // set when added to a Game
            
            minBounceInterval: minBounceInterval,
            
            radius: radius,
            radiusX: radius,
            radiusY: radius,
            
            // are set in reset()
            
            initialSpeed: 0,
            initialAngle: 0,
            
            x: 0,
            y: 0,
            
            speed: 0,
            angle: 0,
            
            lastXBounceTick: 0,
            lastYBounceTick: 0,
            numBounces: 0,
            
            update: update,
            render: render,
            reset: reset,
            
        };
        
        const privateBall: PrivateBouncingBall = ball;
        
        return ball;
        
    },
    
}.freeze();

export interface BouncingBallsGame extends Game {
    
    readonly balls: BouncingBall[];
    
    readonly addBall: Listener;
    
}

export interface BouncingBallsGameOptions {
    
    canvas: CanvasConstructor;
    
    name?: string;
    
    parent: HTMLElement;
    
    gameSize: Vector;
    
    numBalls: number;
    
    ballRadius: () => number;
    ballPosition: () => Vector;
    ballVelocity: () => Vector;
    
}

interface BouncingBallsGameClass {
    
    // noinspection ReservedWordAsName
    new: (options: BouncingBallsGameOptions) => BouncingBallsGame;
    
    default(numBalls?: number): BouncingBallsGame;
    
    main(): void,
    
}

export const BouncingBallsGame: BouncingBallsGameClass = {
    
    new(options: BouncingBallsGameOptions): BouncingBallsGame {
        
        options = options.clone();
        
        const parent: HTMLElement = options.parent.appendNewElement("center");
        
        const canvasDiv: HTMLDivElement = parent.appendDiv();
        
        canvasDiv.appendNewElement("h4").innerText = options.name;
        canvasDiv.appendBr();
        
        const game: BouncingBallsGame = <BouncingBallsGame> Game.new({
            canvas: options.canvas,
            name: options.name || "Bouncing Balls",
            size: options.gameSize,
        });
        
        const newBall = function(id: number): BouncingBall {
            return BouncingBall.new({
                id: id,
                minBounceInterval: 2,
                position: options.ballPosition,
                radius: options.ballRadius,
                velocity: options.ballVelocity,
            });
        };
        
        const overrideRemove = function(ball: BouncingBall): void {
            const superRemove = ball.remove;
            (<any> ball).remove = function() {
                superRemove();
                const id: number = ball.ballId;
                const movedBall: BouncingBall = balls.pop();
                if (id !== balls.length) {
                    balls[id] = movedBall;
                }
                (<any> movedBall).ballId = id;
                (<any> ball).ballId = null;
            };
        };
        
        const balls: BouncingBall[] = new Array(options.numBalls)
            .fill(null)
            .map((e: null, i: number) => newBall(i));
        (<any> game).balls = balls;
        balls.forEach(game.addActor);
        balls.forEach(overrideRemove);
        
        (<any> game).addBall = Listener.new(() => {
            console.log("adding ball");
            const ball: BouncingBall = newBall(balls.length);
            game.addActor(ball);
            overrideRemove(ball);
            balls.push(ball);
        });
        game.addBall.click(game.canvas);
        
        const superReset: GameAction = game.reset;
        (<any> game).reset = GameAction.new(() => {
            // console.log(balls.slice(options.numBalls, balls.length));
            balls.slice(options.numBalls, balls.length)
                .reverse() // remove from back
                .forEach(ball => ball.remove());
            superReset();
        });
        
        game.canvas.appendTo(canvasDiv);
        
        parent.appendChild(game.start.button.withInnerText("Start"));
        parent.appendChild(game.stop.button.withInnerText("Pause"));
        parent.appendChild(game.resume.button.withInnerText("Resume"));
        parent.appendChild(game.restart.button.withInnerText("Restart"));
        
        return <BouncingBallsGame> game;
    },
    
    default(numBalls?: number): BouncingBallsGame {
        
        const radius: number = 10;
        
        const size: Vector = {x: 600, y: 600};
        
        const randomVector = function(vector: Vector, radius: number): Vector {
            return {
                x: MathUtils.randomRange(radius, radius + vector.x),
                y: MathUtils.randomRange(radius, radius + vector.y),
            };
        };
        
        const velocity = function(speed: number, angle: number): Vector {
            return {x: speed * Math.cos(angle), y: speed * Math.sin(angle)};
        };
        
        return BouncingBallsGame.new({
            canvas: CanvasCanvas.new,
            name: "Bouncing Balls",
            parent: document.body.appendNewElement("div"),
            gameSize: size,
            numBalls: numBalls || 10,
            ballRadius: () => radius,
            ballPosition: randomVector.bind(null, size, radius),
            ballVelocity: () => velocity(10, Math.random() * MathUtils.TAU),
        });
    },
    
    main() {
        let numBalls: number = parseInt(queryParams().get("numBalls"));
        if (!numBalls || numBalls < 0) {
            numBalls = undefined;
        }
        BouncingBallsGame.default(numBalls).start();
    },
    
}.freeze();