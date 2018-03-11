import {Listener} from "./listener";
import {Canvas, CanvasConstructor} from "./svgCanvas";

export interface Vector {
    
    x: number;
    y: number;
    
}

export interface GameUpdater {
    
    (game: Game): void;
    
}

export interface GameRenderer {
    
    (game: Game): void;
    
}

interface PrivateActor {
    
    actorId: number;
    
    game?: Game;
    
    remove?: () => void;
    
}

export interface Actor {
    
    readonly actorId?: number;
    
    readonly game?: Game;
    
    readonly update: GameUpdater;
    
    readonly render: GameRenderer;
    
    reset(game: Game): void;
    
    readonly remove?: () => void;
    
}

interface GameFrame {
    
    tick: number;
    time?: number;
    delta: number;
    prevId?: number;
    
    running: boolean;
    paused: boolean;
    
}

export interface GameAction {
    
    (): void;
    
    readonly listener: Listener;
    
    readonly button: HTMLButtonElement;
    
}

export const GameAction = {
    
    new(action: () => void): GameAction {
        const gameAction: any = action;
        gameAction.listener = Listener.new(action);
        gameAction.button = document.createElement("button");
        gameAction.listener.click(gameAction.button);
        return <GameAction> gameAction;
    },
    
}.freeze();

export interface Game {
    
    readonly name: string;
    
    readonly canvas: Canvas;
    readonly parent: HTMLElement;
    
    readonly tick: number;
    readonly time?: number;
    readonly delta: number;
    readonly prevId?: number;
    
    clearFrame: boolean;
    
    clear(): void;
    
    readonly start: GameAction;
    readonly stop: GameAction;
    readonly resume: GameAction;
    readonly reset: GameAction;
    readonly restart: GameAction;
    
    readonly running: boolean;
    readonly paused: boolean;
    
    readonly actors: Actor[];
    
    addActor(actor: Actor): void;
    
}

export interface GameOptions {
    
    name: string;
    
    canvas: CanvasConstructor;
    
    size: Vector;
    
}

export const Game = {
    
    new(options: GameOptions): Game {
        
        const canvas: Canvas = options.canvas();
        const parent: HTMLElement = canvas.parentElement;
        canvas.width = options.size.x;
        canvas.height = options.size.y;
        canvas.style.border = "1px solid black";
        
        const actors: Actor[] = [];
        
        const game: Game = {
            
            name: name,
            
            canvas: canvas,
            parent: parent,
            tick: 0,
            time: null,
            delta: 0,
            prevId: null,
            
            clearFrame: true,
            
            clear(): void {
                canvas.clear();
            },
            
            start: GameAction.new(() => {
                resume(true);
                frame.paused = false;
                frame.running = true;
            }),
            
            stop: GameAction.new(() => {
                window.cancelAnimationFrame(game.prevId);
                frame.prevId = null;
                frame.time = null;
                frame.paused = true;
            }),
            
            resume: GameAction.new(() => {
                resume(false);
                frame.paused = false;
            }),
            
            reset: GameAction.new(() => {
                actors.forEach(actor => actor.reset(game));
            }),
            
            restart: GameAction.new(() => {
                game.stop();
                game.reset();
                game.start();
            }),
            
            running: false,
            paused: false,
            
            actors: actors,
            
            addActor(actor: Actor): void {
                actor.reset(game);
                
                const privateActor: PrivateActor = <PrivateActor> actor;
                privateActor.game = game;
                privateActor.actorId = actors.length;
                privateActor.remove = function() {
                    removeActor(actor);
                };
                
                actors.push(actor);
            },
            
        };
        
        const removeActor = function(actor: Actor): void {
            const id: number = actor.actorId;
            const movedActor: Actor = actors.pop();
            if (id !== actors.length) {
                actors[id] = movedActor;
            }
            const privateActor: PrivateActor = <PrivateActor> actor;
            privateActor.game = null;
            privateActor.actorId = null;
            (<PrivateActor> movedActor).actorId = id;
        };
        
        const frame: GameFrame = game;
        
        const update: GameUpdater = function(game: Game) {
            actors.forEach(actor => actor.update(game));
        };
        
        const render: GameRenderer = function(game: Game) {
            if (game.clearFrame) {
                game.clear();
            }
            actors.forEach(actor => actor.render(game));
        };
        
        const gameLoop = function(time) {
            frame.tick++;
            frame.delta = game.time === null ? 0 : time - game.time;
            frame.time = time;
            update(game);
            render(game);
            frame.prevId = window.requestAnimationFrame(gameLoop);
        };
        
        const resume = function(reset: boolean) {
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