"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const canvasCanvas_1 = require("./canvasCanvas");
const listener_1 = require("./listener");
const utils_1 = require("./utils");
const game_1 = require("./game");
exports.BouncingBall = {
    new(options) {
        if (!options.minBounceInterval) {
            options.minBounceInterval = 2; // default
        }
        const reset = function (game) {
            const velocity = options.velocity();
            privateBall.initialSpeed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
            privateBall.initialAngle = Math.atan2(velocity.y, velocity.x);
            const position = options.position();
            privateBall.x = position.x;
            privateBall.y = position.y;
            privateBall.speed = privateBall.initialSpeed;
            privateBall.angle = privateBall.initialAngle;
            privateBall.lastXBounceTick = 0;
            privateBall.lastYBounceTick = 0;
            privateBall.numBounces = 0;
        };
        const minBounceInterval = options.minBounceInterval | 0;
        const radius = +options.radius();
        const dist2 = function (ball1, ball2) {
            "use asm";
            const dx = +ball1.x - +ball2.x;
            const dy = +ball1.y - +ball2.y;
            return dx * dx + dy * dy;
        };
        const collide = function (game) {
            "use asm";
            const balls = game.balls;
            for (let i = ball.ballId | 0; i < (balls.length | 0); i++) {
                const otherBall = balls[i];
                const radiusSum = +(+radius + +otherBall.radius);
                if (dist2(ball, otherBall) <= radiusSum * radiusSum) {
                    // assume equal mass
                    // TODO collide
                }
            }
        };
        const move = function (game) {
            "use asm";
            const canvas = game.canvas;
            const width = +canvas.width;
            const height = +canvas.height;
            let x = +ball.x;
            let y = +ball.y;
            let angle = +ball.angle;
            const xBounce = x < radius || x > width - radius;
            const yBounce = y < radius || y > height - radius;
            const tick = game.tick | 0;
            if (tick - ball.lastXBounceTick > minBounceInterval && xBounce) {
                angle = -(Math.PI + angle) % utils_1.MathUtils.TAU;
                privateBall.lastXBounceTick = tick;
            }
            else if (tick - ball.lastYBounceTick > minBounceInterval && yBounce) {
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
            const speed = +ball.speed;
            const delta = +1; // this.delta * 0.01;
            x += speed * Math.cos(angle) * delta;
            y += speed * Math.sin(angle) * delta;
            privateBall.angle = angle;
            privateBall.x = x;
            privateBall.y = y;
        };
        const update = function (game) {
            move(game);
            collide(game);
        };
        const render = function (game) {
            game.canvas.fillCircle(ball.x, ball.y, radius);
        };
        const ball = {
            ballId: options.id,
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
        const privateBall = ball;
        return ball;
    },
}.freeze();
exports.BouncingBallsGame = {
    new(options) {
        const parent = options.parent.appendNewElement("center");
        const canvasDiv = parent.appendDiv();
        canvasDiv.appendNewElement("h4").innerText = options.name;
        canvasDiv.appendBr();
        const game = game_1.Game.new({
            canvas: options.canvas,
            name: options.name || "Bouncing Balls",
            size: options.gameSize,
        });
        const newBall = function (id) {
            return exports.BouncingBall.new({
                id: id,
                minBounceInterval: 2,
                position: options.ballPosition,
                radius: options.ballRadius,
                velocity: options.ballVelocity,
            });
        };
        const balls = new Array(options.numBalls)
            .fill(null)
            .map((e, i) => newBall(i));
        game.balls = balls;
        balls.forEach(game.addActor);
        balls.forEach(ball => {
            // override remove()
            const superRemove = ball.remove;
            ball.remove = function () {
                superRemove();
                const id = ball.ballId;
                const movedBall = balls[id] = balls.pop();
                movedBall.ballId = id;
                ball.ballId = null;
            };
        });
        game.addBall = listener_1.Listener.new(() => {
            balls.push(newBall(balls.length));
        });
        game.addBall.click(game.canvas);
        parent.appendChild(game.start.button.withInnerText("Start"));
        parent.appendChild(game.stop.button.withInnerText("Pause"));
        parent.appendChild(game.resume.button.withInnerText("Resume"));
        parent.appendChild(game.restart.button.withInnerText("Restart"));
        return game;
    },
    default() {
        const size = { x: 600, y: 600 };
        const randomVector = function (vector) {
            return { x: Math.random() * vector.x, y: Math.random() * vector.y };
        };
        const velocity = function (speed, angle) {
            return { x: speed * Math.cos(angle), y: speed * Math.sin(angle) };
        };
        return exports.BouncingBallsGame.new({
            canvas: canvasCanvas_1.CanvasCanvas.new,
            name: "Bouncing Balls",
            parent: document.body.appendNewElement("div"),
            gameSize: size,
            numBalls: 10,
            ballRadius: () => 50,
            ballPosition: randomVector.bind(size),
            ballVelocity: () => velocity(10, Math.random() * utils_1.MathUtils.TAU),
        });
    },
}.freeze();
