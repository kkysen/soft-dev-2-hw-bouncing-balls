import {Canvas, CanvasConstructor} from "./svgCanvas";
import {AnyImage, MathUtils} from "./utils";

export interface CanvasCanvas extends Canvas {

}

export const CanvasCanvas: { new: CanvasConstructor } = {
    
    new(): CanvasCanvas {
        
        const canvas: HTMLCanvasElement = document.createElement("canvas");
        const context: CanvasRenderingContext2D = canvas.getContext("2d");
        
        const canvasCanvas: CanvasCanvas = {
            
            get parentElement(): HTMLElement | null {
                return canvas.parentElement;
            },
    
            get width(): number {
                return canvas.width;
            },
    
            set width(width: number) {
                canvas.width = width;
            },
            
            get height(): number {
                return canvas.height;
            },
            
            set height(height: number) {
                canvas.height = height;
            },
            
            get style(): CSSStyleDeclaration {
                return canvas.style;
            },
            
            appendTo(element: Node): CanvasCanvas {
                element.appendChild(canvas);
                return this;
            },
            
            appendChild<T extends Node>(element: T): T {
                return canvas.appendChild(element);
            },
            
            addEventListener(eventType: string, listener, optionsOrUseCapture): void {
                canvas.addEventListener(eventType, listener, optionsOrUseCapture);
            },
    
            removeEventListener(eventType: string, listener, optionsOrUseCapture): void {
                canvas.removeEventListener(eventType, listener, optionsOrUseCapture);
            },
    
            dispatchEvent(event: Event): boolean {
                return canvas.dispatchEvent(event);
            },
            
            set fillStyle(fillStyle: string) {
                context.fillStyle = fillStyle;
            },
            
            set strokeStyle(strokeStyle: string) {
                context.strokeStyle = strokeStyle;
            },
            
            clear(): void {
                context.clearRect(0, 0, canvas.width, canvas.height);
            },
            
            fillRect(x: number, y: number, width: number, height: number,
                               fillStyle?: string): void {
                let oldFillStyle: string | CanvasGradient | CanvasPattern;
                if (fillStyle) {
                    oldFillStyle = context.fillStyle;
                    context.fillStyle = fillStyle;
                }
                context.fillRect(x, y, width, height);
                if (oldFillStyle) {
                    context.fillStyle = oldFillStyle;
                }
            },
            
            fillRectCentered(x: number, y: number, width: number, height: number,
                                       fillStyle?: string): void {
                this.fillRect(x - width * 0.5, y - height * 0.5, width, height, fillStyle);
                context.moveTo(x, y);
            },
            
            fillCircle(x: number, y: number, radius: number,
                                 fillStyle?: string, strokeStyle?: string): void {
                this.fillEllipse(x, y, radius, radius, fillStyle, strokeStyle);
            },
            
            fillEllipse(x: number, y: number, radiusX: number, radiusY: number,
                        fillStyle?: string, strokeStyle?: string): void {
                let oldFillStyle: string | CanvasGradient | CanvasPattern;
                let oldStrokeStyle: string | CanvasGradient | CanvasPattern;
                if (fillStyle) {
                    oldFillStyle = context.fillStyle;
                    context.fillStyle = fillStyle;
                }
                if (oldStrokeStyle) {
                    oldStrokeStyle = context.strokeStyle;
                    context.strokeStyle = strokeStyle;
                }
                context.beginPath();
                context.ellipse(x, y, radiusX, radiusY, 0, 0, MathUtils.TAU);
                context.fill();
                context.beginPath();
                if (oldFillStyle) {
                    context.fillStyle = oldFillStyle;
                }
                if (oldStrokeStyle) {
                    context.strokeStyle = oldStrokeStyle;
                }
                context.moveTo(x, y);
            },
            
            moveTo(x: number, y: number): void {
                context.moveTo(x, y);
            },
            
            line(x1: number, y1: number, x2: number, y2: number, strokeStyle?: string): void {
                let oldStrokeStyle: string | CanvasGradient | CanvasPattern;
                if (strokeStyle) {
                    oldStrokeStyle = context.strokeStyle;
                    context.strokeStyle = strokeStyle;
                }
                context.moveTo(x1, y2);
                context.lineTo(x2, y2);
                if (oldStrokeStyle) {
                    context.strokeStyle = oldStrokeStyle;
                }
            },
            
            lineTo(x: number, y: number, strokeStyle?: string): void {
                let oldStrokeStyle: string | CanvasGradient | CanvasPattern;
                if (strokeStyle) {
                    oldStrokeStyle = context.strokeStyle;
                    context.strokeStyle = strokeStyle;
                }
                context.lineTo(x, y);
                if (oldStrokeStyle) {
                    context.strokeStyle = oldStrokeStyle;
                }
            },
            
            drawImage(image: AnyImage, destX: number, destY: number, destWidth?: number, destHeight?: number): void {
                context.drawImage(image, destX, destY, destWidth, destHeight);
            },
            
        };
        
        return Object.freeze(canvasCanvas);
        
    },
    
};

Object.freeze(CanvasCanvas);