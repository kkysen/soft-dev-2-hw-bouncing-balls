"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const listener_1 = require("./listener");
exports.GameAction = {
    new(action) {
        const gameAction = action;
        gameAction.listener = listener_1.Listener.new(action);
        gameAction.button = document.createElement("button");
        gameAction.listener.click(gameAction.button);
        return gameAction;
    },
}.freeze();
exports.Game = {
    new(options) {
        const canvas = options.canvas();
        const parent = canvas.parentElement;
        canvas.width = options.size.x;
        canvas.height = options.size.y;
        canvas.style.border = "1px solid black";
        const actors = [];
        const game = {
            name: name,
            canvas: canvas,
            parent: parent,
            tick: 0,
            time: null,
            delta: 0,
            prevId: null,
            clearFrame: true,
            clear() {
                canvas.clear();
            },
            start: exports.GameAction.new(() => {
                resume(true);
                frame.paused = false;
                frame.running = true;
            }),
            stop: exports.GameAction.new(() => {
                window.cancelAnimationFrame(game.prevId);
                frame.prevId = null;
                frame.time = null;
                frame.paused = true;
            }),
            resume: exports.GameAction.new(() => {
                resume(false);
                frame.paused = false;
            }),
            reset: exports.GameAction.new(() => {
                actors.forEach(actor => actor.reset(game));
            }),
            restart: exports.GameAction.new(() => {
                game.stop();
                game.reset();
                game.start();
            }),
            running: false,
            paused: false,
            actors: actors,
            addActor(actor) {
                actor.reset(game);
                const privateActor = actor;
                privateActor.game = game;
                privateActor.actorId = actors.length;
                privateActor.remove = function () {
                    removeActor(actor);
                };
                actors.push(actor);
            },
        };
        const removeActor = function (actor) {
            const id = actor.actorId;
            const movedActor = actors.pop();
            if (id !== actors.length) {
                actors[id] = movedActor;
            }
            const privateActor = actor;
            privateActor.game = null;
            privateActor.actorId = null;
            movedActor.actorId = id;
        };
        const frame = game;
        const update = function (game) {
            actors.forEach(actor => actor.update(game));
        };
        const render = function (game) {
            if (game.clearFrame) {
                game.clear();
            }
            actors.forEach(actor => actor.render(game));
        };
        const gameLoop = function (time) {
            frame.tick++;
            frame.delta = game.time === null ? 0 : time - game.time;
            frame.time = time;
            update(game);
            render(game);
            frame.prevId = window.requestAnimationFrame(gameLoop);
        };
        const resume = function (reset) {
            if (reset) {
                game.reset();
            }
            if (!frame.prevId) {
                // if not already stopped
                frame.prevId = window.requestAnimationFrame(gameLoop);
                console.log("starting");
            }
        };
        return game;
    },
}.freeze();
