/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/bouncingBalls.ts":
/*!******************************!*\
  !*** ./src/bouncingBalls.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst canvasCanvas_1 = __webpack_require__(/*! ./canvasCanvas */ \"./src/canvasCanvas.ts\");\r\nconst listener_1 = __webpack_require__(/*! ./listener */ \"./src/listener.ts\");\r\nconst utils_1 = __webpack_require__(/*! ./utils */ \"./src/utils.ts\");\r\nconst game_1 = __webpack_require__(/*! ./game */ \"./src/game.ts\");\r\nexports.BouncingBall = {\r\n    new(options) {\r\n        if (!options.minBounceInterval) {\r\n            options.minBounceInterval = 2; // default\r\n        }\r\n        const reset = function (game) {\r\n            const velocity = options.velocity();\r\n            privateBall.initialSpeed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);\r\n            privateBall.initialAngle = Math.atan2(velocity.y, velocity.x);\r\n            const position = options.position();\r\n            privateBall.x = position.x;\r\n            privateBall.y = position.y;\r\n            privateBall.speed = privateBall.initialSpeed;\r\n            privateBall.angle = privateBall.initialAngle;\r\n            privateBall.lastXBounceTick = 0;\r\n            privateBall.lastYBounceTick = 0;\r\n            privateBall.numBounces = 0;\r\n        };\r\n        const minBounceInterval = options.minBounceInterval | 0;\r\n        const radius = +options.radius();\r\n        const dist2 = function (ball1, ball2) {\r\n            \"use asm\";\r\n            const dx = +ball1.x - +ball2.x;\r\n            const dy = +ball1.y - +ball2.y;\r\n            return dx * dx + dy * dy;\r\n        };\r\n        const collide = function (game) {\r\n            \"use asm\";\r\n            const balls = game.balls;\r\n            for (let i = ball.ballId | 0; i < (balls.length | 0); i++) {\r\n                const otherBall = balls[i];\r\n                const radiusSum = +(+radius + +otherBall.radius);\r\n                if (dist2(ball, otherBall) <= radiusSum * radiusSum) {\r\n                    // assume equal mass\r\n                    // TODO collide\r\n                }\r\n            }\r\n        };\r\n        const move = function (game) {\r\n            \"use asm\";\r\n            const canvas = game.canvas;\r\n            const width = +canvas.width;\r\n            const height = +canvas.height;\r\n            let x = +ball.x;\r\n            let y = +ball.y;\r\n            let angle = +ball.angle;\r\n            const xBounce = x < radius || x > width - radius;\r\n            const yBounce = y < radius || y > height - radius;\r\n            const tick = game.tick | 0;\r\n            if (tick - ball.lastXBounceTick > minBounceInterval && xBounce) {\r\n                angle = -(Math.PI + angle) % utils_1.MathUtils.TAU;\r\n                privateBall.lastXBounceTick = tick;\r\n            }\r\n            else if (tick - ball.lastYBounceTick > minBounceInterval && yBounce) {\r\n                angle = -angle;\r\n                privateBall.lastYBounceTick = tick;\r\n            }\r\n            if (xBounce || yBounce) {\r\n                privateBall.numBounces++;\r\n            }\r\n            // fail safe to rescue balls off screen\r\n            if (tick % 16 === 0) {\r\n                if (x < 0) {\r\n                    x = radius;\r\n                }\r\n                if (x > width) {\r\n                    x = width - radius;\r\n                }\r\n                if (y < 0) {\r\n                    y = radius;\r\n                }\r\n                if (y > height) {\r\n                    y = height - radius;\r\n                }\r\n            }\r\n            // super fail safe, reset to center\r\n            // usually happens at extreme speeds, so not noticeable really\r\n            if (tick % 64 === 0) {\r\n                if (x < 0 || x > width) {\r\n                    console.log(\"super fail safe\");\r\n                    x = width / 2;\r\n                }\r\n                if (y < 0 || y > height) {\r\n                    console.log(\"super fail safe\");\r\n                    y = height / 2;\r\n                }\r\n            }\r\n            const speed = +ball.speed;\r\n            const delta = +1; // this.delta * 0.01;\r\n            x += speed * Math.cos(angle) * delta;\r\n            y += speed * Math.sin(angle) * delta;\r\n            privateBall.angle = angle;\r\n            privateBall.x = x;\r\n            privateBall.y = y;\r\n        };\r\n        const update = function (game) {\r\n            move(game);\r\n            collide(game);\r\n        };\r\n        const render = function (game) {\r\n            game.canvas.fillCircle(ball.x, ball.y, radius);\r\n        };\r\n        const ball = {\r\n            ballId: options.id,\r\n            minBounceInterval: minBounceInterval,\r\n            radius: radius,\r\n            radiusX: radius,\r\n            radiusY: radius,\r\n            // are set in reset()\r\n            initialSpeed: 0,\r\n            initialAngle: 0,\r\n            x: 0,\r\n            y: 0,\r\n            speed: 0,\r\n            angle: 0,\r\n            lastXBounceTick: 0,\r\n            lastYBounceTick: 0,\r\n            numBounces: 0,\r\n            update: update,\r\n            render: render,\r\n            reset: reset,\r\n        };\r\n        const privateBall = ball;\r\n        return ball;\r\n    },\r\n}.freeze();\r\nexports.BouncingBallsGame = {\r\n    new(options) {\r\n        options = options.clone();\r\n        const parent = options.parent.appendNewElement(\"center\");\r\n        const canvasDiv = parent.appendDiv();\r\n        canvasDiv.appendNewElement(\"h4\").innerText = options.name;\r\n        canvasDiv.appendBr();\r\n        const game = game_1.Game.new({\r\n            canvas: options.canvas,\r\n            name: options.name || \"Bouncing Balls\",\r\n            size: options.gameSize,\r\n        });\r\n        const newBall = function (id) {\r\n            return exports.BouncingBall.new({\r\n                id: id,\r\n                minBounceInterval: 2,\r\n                position: options.ballPosition,\r\n                radius: options.ballRadius,\r\n                velocity: options.ballVelocity,\r\n            });\r\n        };\r\n        const balls = new Array(options.numBalls)\r\n            .fill(null)\r\n            .map((e, i) => newBall(i));\r\n        game.balls = balls;\r\n        balls.forEach(game.addActor);\r\n        balls.forEach(ball => {\r\n            // override remove()\r\n            const superRemove = ball.remove;\r\n            ball.remove = function () {\r\n                superRemove();\r\n                const id = ball.ballId;\r\n                const movedBall = balls.pop();\r\n                if (id !== balls.length - 1) {\r\n                    balls[id] = movedBall;\r\n                }\r\n                movedBall.ballId = id;\r\n                ball.ballId = null;\r\n            };\r\n        });\r\n        game.addBall = listener_1.Listener.new(() => {\r\n            console.log(\"adding ball\");\r\n            const ball = newBall(balls.length);\r\n            game.addActor(ball);\r\n            balls.push(ball);\r\n        });\r\n        game.addBall.click(game.canvas);\r\n        const superReset = game.reset;\r\n        game.reset = game_1.GameAction.new(() => {\r\n            superReset();\r\n            console.log(balls.slice(options.numBalls, balls.length));\r\n            balls.slice(options.numBalls, balls.length)\r\n                .reverse() // remove from back\r\n                .forEach(ball => ball.remove());\r\n        });\r\n        game.canvas.appendTo(canvasDiv);\r\n        parent.appendChild(game.start.button.withInnerText(\"Start\"));\r\n        parent.appendChild(game.stop.button.withInnerText(\"Pause\"));\r\n        parent.appendChild(game.resume.button.withInnerText(\"Resume\"));\r\n        parent.appendChild(game.restart.button.withInnerText(\"Restart\"));\r\n        return game;\r\n    },\r\n    default() {\r\n        const radius = 10;\r\n        const size = { x: 600, y: 600 };\r\n        const randomVector = function (vector, radius) {\r\n            return {\r\n                x: utils_1.MathUtils.randomRange(radius, radius + vector.x),\r\n                y: utils_1.MathUtils.randomRange(radius, radius + vector.y),\r\n            };\r\n        };\r\n        const velocity = function (speed, angle) {\r\n            return { x: speed * Math.cos(angle), y: speed * Math.sin(angle) };\r\n        };\r\n        return exports.BouncingBallsGame.new({\r\n            canvas: canvasCanvas_1.CanvasCanvas.new,\r\n            name: \"Bouncing Balls\",\r\n            parent: document.body.appendNewElement(\"div\"),\r\n            gameSize: size,\r\n            numBalls: 10,\r\n            ballRadius: () => radius,\r\n            ballPosition: randomVector.bind(null, size, radius),\r\n            ballVelocity: () => velocity(10, Math.random() * utils_1.MathUtils.TAU),\r\n        });\r\n    },\r\n}.freeze();\r\n\n\n//# sourceURL=webpack:///./src/bouncingBalls.ts?");

/***/ }),

/***/ "./src/canvasCanvas.ts":
/*!*****************************!*\
  !*** ./src/canvasCanvas.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst utils_1 = __webpack_require__(/*! ./utils */ \"./src/utils.ts\");\r\nexports.CanvasCanvas = {\r\n    new() {\r\n        const canvas = document.createElement(\"canvas\");\r\n        const context = canvas.getContext(\"2d\");\r\n        const canvasCanvas = {\r\n            get parentElement() {\r\n                return canvas.parentElement;\r\n            },\r\n            get width() {\r\n                return canvas.width;\r\n            },\r\n            set width(width) {\r\n                canvas.width = width;\r\n            },\r\n            get height() {\r\n                return canvas.height;\r\n            },\r\n            set height(height) {\r\n                canvas.height = height;\r\n            },\r\n            get style() {\r\n                return canvas.style;\r\n            },\r\n            appendTo(element) {\r\n                element.appendChild(canvas);\r\n                return this;\r\n            },\r\n            appendChild(element) {\r\n                return canvas.appendChild(element);\r\n            },\r\n            addEventListener(eventType, listener, optionsOrUseCapture) {\r\n                canvas.addEventListener(eventType, listener, optionsOrUseCapture);\r\n            },\r\n            removeEventListener(eventType, listener, optionsOrUseCapture) {\r\n                canvas.removeEventListener(eventType, listener, optionsOrUseCapture);\r\n            },\r\n            dispatchEvent(event) {\r\n                return canvas.dispatchEvent(event);\r\n            },\r\n            set fillStyle(fillStyle) {\r\n                context.fillStyle = fillStyle;\r\n            },\r\n            set strokeStyle(strokeStyle) {\r\n                context.strokeStyle = strokeStyle;\r\n            },\r\n            clear() {\r\n                context.clearRect(0, 0, canvas.width, canvas.height);\r\n            },\r\n            fillRect(x, y, width, height, fillStyle) {\r\n                let oldFillStyle;\r\n                if (fillStyle) {\r\n                    oldFillStyle = context.fillStyle;\r\n                    context.fillStyle = fillStyle;\r\n                }\r\n                context.fillRect(x, y, width, height);\r\n                if (oldFillStyle) {\r\n                    context.fillStyle = oldFillStyle;\r\n                }\r\n            },\r\n            fillRectCentered(x, y, width, height, fillStyle) {\r\n                this.fillRect(x - width * 0.5, y - height * 0.5, width, height, fillStyle);\r\n                context.moveTo(x, y);\r\n            },\r\n            fillCircle(x, y, radius, fillStyle, strokeStyle) {\r\n                this.fillEllipse(x, y, radius, radius, fillStyle, strokeStyle);\r\n            },\r\n            fillEllipse(x, y, radiusX, radiusY, fillStyle, strokeStyle) {\r\n                let oldFillStyle;\r\n                let oldStrokeStyle;\r\n                if (fillStyle) {\r\n                    oldFillStyle = context.fillStyle;\r\n                    context.fillStyle = fillStyle;\r\n                }\r\n                if (oldStrokeStyle) {\r\n                    oldStrokeStyle = context.strokeStyle;\r\n                    context.strokeStyle = strokeStyle;\r\n                }\r\n                context.beginPath();\r\n                context.ellipse(x, y, radiusX, radiusY, 0, 0, utils_1.MathUtils.TAU);\r\n                context.fill();\r\n                context.beginPath();\r\n                if (oldFillStyle) {\r\n                    context.fillStyle = oldFillStyle;\r\n                }\r\n                if (oldStrokeStyle) {\r\n                    context.strokeStyle = oldStrokeStyle;\r\n                }\r\n                context.moveTo(x, y);\r\n            },\r\n            moveTo(x, y) {\r\n                context.moveTo(x, y);\r\n            },\r\n            line(x1, y1, x2, y2, strokeStyle) {\r\n                let oldStrokeStyle;\r\n                if (strokeStyle) {\r\n                    oldStrokeStyle = context.strokeStyle;\r\n                    context.strokeStyle = strokeStyle;\r\n                }\r\n                context.moveTo(x1, y2);\r\n                context.lineTo(x2, y2);\r\n                if (oldStrokeStyle) {\r\n                    context.strokeStyle = oldStrokeStyle;\r\n                }\r\n            },\r\n            lineTo(x, y, strokeStyle) {\r\n                let oldStrokeStyle;\r\n                if (strokeStyle) {\r\n                    oldStrokeStyle = context.strokeStyle;\r\n                    context.strokeStyle = strokeStyle;\r\n                }\r\n                context.lineTo(x, y);\r\n                if (oldStrokeStyle) {\r\n                    context.strokeStyle = oldStrokeStyle;\r\n                }\r\n            },\r\n            drawImage(image, destX, destY, destWidth, destHeight) {\r\n                context.drawImage(image, destX, destY, destWidth, destHeight);\r\n            },\r\n        };\r\n        return Object.freeze(canvasCanvas);\r\n    },\r\n};\r\nObject.freeze(exports.CanvasCanvas);\r\n\n\n//# sourceURL=webpack:///./src/canvasCanvas.ts?");

/***/ }),

/***/ "./src/extensions.ts":
/*!***************************!*\
  !*** ./src/extensions.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("Object.defineProperties(Object, {\r\n    defineSharedProperties: {\r\n        writable: false,\r\n        enumerable: false,\r\n        configurable: false,\r\n        value(obj, sharedDescriptor, propertyValues) {\r\n            const properties = {};\r\n            for (const value in propertyValues) {\r\n                if (propertyValues.hasOwnProperty(value)) {\r\n                    properties[value] = Object.assign({ value: propertyValues[value] }, sharedDescriptor);\r\n                }\r\n            }\r\n            Object.defineProperties(obj, properties);\r\n        },\r\n    },\r\n});\r\nObject.defineSharedProperties(Object.prototype, {\r\n    writable: false,\r\n    enumerable: false,\r\n    configurable: false,\r\n}, {\r\n    freeze() {\r\n        return Object.freeze(this);\r\n    },\r\n    seal() {\r\n        return Object.seal(this);\r\n    },\r\n    clone() {\r\n        return Object.assign({}, this);\r\n    },\r\n});\r\nElement.prototype.clearHTML = function () {\r\n    this.innerHTML = \"\";\r\n};\r\nElement.prototype.setAttributes = function (attributes) {\r\n    for (const attribute in attributes) {\r\n        if (attributes.hasOwnProperty(attribute) && attributes[attribute]) {\r\n            this.setAttribute(attribute, attributes[attribute].toString());\r\n        }\r\n    }\r\n};\r\nHTMLElement.prototype.appendNewElement = function (tagName) {\r\n    return this.appendChild(document.createElement(tagName));\r\n};\r\nHTMLElement.prototype.appendDiv = function () {\r\n    return this.appendNewElement(\"div\");\r\n};\r\nHTMLElement.prototype.appendButton = function (buttonText) {\r\n    const button = this.appendNewElement(\"button\");\r\n    button.innerText = buttonText;\r\n    return button;\r\n};\r\nHTMLElement.prototype.appendBr = function () {\r\n    return this.appendNewElement(\"br\");\r\n};\r\nHTMLElement.prototype.withInnerText = function (text) {\r\n    this.innerText = text;\r\n    return this;\r\n};\r\n\n\n//# sourceURL=webpack:///./src/extensions.ts?");

/***/ }),

/***/ "./src/game.ts":
/*!*********************!*\
  !*** ./src/game.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst listener_1 = __webpack_require__(/*! ./listener */ \"./src/listener.ts\");\r\nexports.GameAction = {\r\n    new(action) {\r\n        const gameAction = action;\r\n        gameAction.listener = listener_1.Listener.new(action);\r\n        gameAction.button = document.createElement(\"button\");\r\n        gameAction.listener.click(gameAction.button);\r\n        return gameAction;\r\n    },\r\n}.freeze();\r\nexports.Game = {\r\n    new(options) {\r\n        const canvas = options.canvas();\r\n        const parent = canvas.parentElement;\r\n        canvas.width = options.size.x;\r\n        canvas.height = options.size.y;\r\n        canvas.style.border = \"1px solid black\";\r\n        const actors = [];\r\n        const game = {\r\n            name: name,\r\n            canvas: canvas,\r\n            parent: parent,\r\n            tick: 0,\r\n            time: null,\r\n            delta: 0,\r\n            prevId: null,\r\n            clearFrame: true,\r\n            clear() {\r\n                canvas.clear();\r\n            },\r\n            start: exports.GameAction.new(() => {\r\n                resume(true);\r\n                frame.paused = false;\r\n                frame.running = true;\r\n            }),\r\n            stop: exports.GameAction.new(() => {\r\n                window.cancelAnimationFrame(game.prevId);\r\n                frame.prevId = null;\r\n                frame.time = null;\r\n                frame.paused = true;\r\n            }),\r\n            resume: exports.GameAction.new(() => {\r\n                resume(false);\r\n                frame.paused = false;\r\n            }),\r\n            reset: exports.GameAction.new(() => {\r\n                actors.forEach(actor => actor.reset(game));\r\n            }),\r\n            restart: exports.GameAction.new(() => {\r\n                game.stop();\r\n                game.reset();\r\n                game.start();\r\n            }),\r\n            running: false,\r\n            paused: false,\r\n            actors: actors,\r\n            addActor(actor) {\r\n                actor.reset(game);\r\n                actors.push(actor);\r\n                const privateActor = actor;\r\n                privateActor.game = game;\r\n                privateActor.actorId = actors.length;\r\n                privateActor.remove = function () {\r\n                    removeActor(actor);\r\n                };\r\n            },\r\n        };\r\n        const removeActor = function (actor) {\r\n            const id = actor.actorId;\r\n            const movedActor = actors.pop();\r\n            if (id !== actors.length - 1) {\r\n                actors[id] = movedActor;\r\n            }\r\n            const privateActor = actor;\r\n            privateActor.game = null;\r\n            privateActor.actorId = null;\r\n            movedActor.actorId = id;\r\n        };\r\n        const frame = game;\r\n        const update = function (game) {\r\n            actors.forEach(actor => actor.update(game));\r\n        };\r\n        const render = function (game) {\r\n            if (game.clearFrame) {\r\n                game.clear();\r\n            }\r\n            actors.forEach(actor => actor.render(game));\r\n        };\r\n        const gameLoop = function (time) {\r\n            frame.tick++;\r\n            frame.delta = game.time === null ? 0 : time - game.time;\r\n            frame.time = time;\r\n            update(game);\r\n            render(game);\r\n            frame.prevId = window.requestAnimationFrame(gameLoop);\r\n        };\r\n        const resume = function (reset) {\r\n            if (reset) {\r\n                game.reset();\r\n            }\r\n            if (!frame.prevId) {\r\n                // if not already stopped\r\n                frame.prevId = window.requestAnimationFrame(gameLoop);\r\n                console.log(\"starting\");\r\n            }\r\n        };\r\n        return game;\r\n    },\r\n}.freeze();\r\n\n\n//# sourceURL=webpack:///./src/game.ts?");

/***/ }),

/***/ "./src/listener.ts":
/*!*************************!*\
  !*** ./src/listener.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst utils_1 = __webpack_require__(/*! ./utils */ \"./src/utils.ts\");\r\nexports.Listener = {\r\n    new(listener) {\r\n        let listeners = [];\r\n        const joinListeners = function (listeners) {\r\n            return function (e) {\r\n                e.preventDefault();\r\n                listener(e);\r\n                for (const listener of listeners) {\r\n                    listener(e);\r\n                }\r\n            };\r\n        };\r\n        const self = {\r\n            then(nextListener) {\r\n                if (utils_1.isFunction(nextListener)) {\r\n                    listeners.push(nextListener);\r\n                }\r\n                return this;\r\n            },\r\n            attachTo: function (target, type) {\r\n                target.addEventListener(type, joinListeners(listeners));\r\n                listeners = [];\r\n                return target;\r\n            },\r\n            click: function (target) {\r\n                return self.attachTo(target, \"click\");\r\n            },\r\n        };\r\n        return self;\r\n    },\r\n    none() {\r\n        return exports.Listener.new(() => undefined);\r\n    },\r\n}.freeze();\r\n\n\n//# sourceURL=webpack:///./src/listener.ts?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\n__webpack_require__(/*! ./extensions */ \"./src/extensions.ts\");\nconst bouncingBalls_1 = __webpack_require__(/*! ./bouncingBalls */ \"./src/bouncingBalls.ts\");\n(function () {\n    bouncingBalls_1.BouncingBallsGame.default().start();\n})();\n\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.MathUtils = {\r\n    TAU: 2 * Math.PI,\r\n    rad2deg(radians) {\r\n        return radians * 180 / Math.PI;\r\n    },\r\n    deg2rad(degrees) {\r\n        return degrees * Math.PI / 180;\r\n    },\r\n    randomRange(min, max) {\r\n        return Math.random() * (max - min) + min;\r\n    },\r\n    angleToString(angle) {\r\n        if (angle < 0) {\r\n            angle += exports.MathUtils.TAU;\r\n        }\r\n        return exports.MathUtils.rad2deg(angle).toFixed(2) + \"°\";\r\n    },\r\n};\r\nexports.isFunction = function (o) {\r\n    return !!(o && o.constructor && o.call && o.apply);\r\n};\r\nclass NullTextElement {\r\n    set innerText(text) {\r\n        // do nothing\r\n    }\r\n}\r\nexports.nullTextElement = new NullTextElement();\r\nexports.queryParams = (() => {\r\n    let cachedQueryParams = null;\r\n    return function () {\r\n        if (cachedQueryParams === null) {\r\n            cachedQueryParams = new Map(window.location.search\r\n                .substring(1)\r\n                .split(\"&\")\r\n                .map(s => s.split(\"=\")));\r\n        }\r\n        return cachedQueryParams;\r\n    };\r\n})();\r\n\n\n//# sourceURL=webpack:///./src/utils.ts?");

/***/ })

/******/ });