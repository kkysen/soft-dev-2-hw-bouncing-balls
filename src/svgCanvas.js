"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SVGCanvas = {
    new() {
        const svgCreate = document.createElementNS.bind(document, "http://www.w3.org/2000/svg");
        const svg = svgCreate("svg");
        svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
        console.log(svg);
        svg.newChild = function (tagName) {
            return svg.appendChild(svgCreate(tagName));
        };
        const p = {
            x: 0,
            y: 0,
            invalid: true,
            set(x, y) {
                this.x = x;
                this.y = y;
                this.invalid = false;
            },
        };
        let fillStyle;
        let strokeStyle;
        const imageToUrl = function (image) {
            if (image instanceof HTMLImageElement || image instanceof HTMLVideoElement) {
                return image.src;
            }
            if (!(image instanceof HTMLCanvasElement)) {
                const canvas = document.createElement("canvas");
                canvas.width = image.width;
                canvas.height = image.height;
                canvas.getContext("2d").drawImage(image, 0, 0);
                image = canvas;
            }
            return image.toDataURL();
        };
        const canvas = {
            get parentElement() {
                return svg.parentElement;
            },
            get width() {
                return parseInt(svg.getAttribute("width"));
            },
            set width(width) {
                svg.setAttribute("width", width.toString());
            },
            get height() {
                return parseInt(svg.getAttribute("height"));
            },
            set height(height) {
                svg.setAttribute("height", height.toString());
            },
            get style() {
                return svg.style;
            },
            appendTo(element) {
                element.appendChild(svg);
                return this;
            },
            appendChild(element) {
                return svg.appendChild(element);
            },
            addEventListener(eventType, listener, optionsOrUseCapture) {
                svg.addEventListener(eventType, listener, optionsOrUseCapture);
            },
            removeEventListener(eventType, listener, optionsOrUseCapture) {
                svg.removeEventListener(eventType, listener, optionsOrUseCapture);
            },
            dispatchEvent(event) {
                return svg.dispatchEvent(event);
            },
            set fillStyle(fill) {
                fillStyle = fill;
            },
            set strokeStyle(stroke) {
                strokeStyle = stroke;
            },
            clear() {
                svg.clearHTML();
                p.invalid = true;
            },
            fillRect(x, y, width, height, fill = fillStyle) {
                svg.newChild("rect").setAttributes({
                    x: x,
                    y: y,
                    width: width,
                    height: height,
                    fill: fill,
                });
                p.set(x, y);
            },
            fillRectCentered(x, y, width, height, fill = fillStyle) {
                this.fillRect(x - width * 0.5, y - height * 0.5, width, height, fill);
                p.set(x, y);
            },
            fillCircle(x, y, radius, fill = fillStyle, stroke = strokeStyle) {
                svg.newChild("circle").setAttributes({
                    cx: x,
                    cy: y,
                    r: radius,
                    fill: fill,
                    stroke: stroke,
                });
                p.set(x, y);
            },
            fillEllipse(x, y, radiusX, radiusY, fill = fillStyle, stroke = strokeStyle) {
                svg.newChild("ellipse").setAttributes({
                    cx: x,
                    cy: y,
                    rx: radiusX,
                    ry: radiusY,
                    fill: fill,
                    stroke: stroke,
                });
                p.set(x, y);
            },
            moveTo(x, y) {
                p.set(x, y);
            },
            line(x1, y1, x2, y2, stroke = strokeStyle) {
                svg.newChild("line").setAttributes({
                    x1: x1,
                    y1: y1,
                    x2: x2,
                    y2: y2,
                    stroke: stroke,
                });
                p.set(x2, y2);
            },
            lineTo(x, y, stroke = strokeStyle) {
                if (p.invalid === true) {
                    return;
                }
                this.line(p.x, p.y, x, y, stroke);
            },
            drawImage(image, destX, destY, destWidth, destHeight) {
                if (!destWidth) {
                    destWidth = image.width;
                }
                if (!destHeight) {
                    destHeight = image.height;
                }
                svg.newChild("image").setAttributes({
                    x: destX,
                    y: destY,
                    width: destWidth,
                    height: destHeight,
                    "href": imageToUrl(image),
                });
                p.set(destX, destY);
            },
        };
        return Object.freeze(canvas);
    },
};
Object.freeze(exports.SVGCanvas);
