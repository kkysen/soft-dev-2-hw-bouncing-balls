"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MathUtils = {
    TAU: 2 * Math.PI,
    rad2deg(radians) {
        return radians * 180 / Math.PI;
    },
    deg2rad(degrees) {
        return degrees * Math.PI / 180;
    },
    randomRange(min, max) {
        return Math.random() * (max - min) + min;
    },
    angleToString(angle) {
        if (angle < 0) {
            angle += exports.MathUtils.TAU;
        }
        return exports.MathUtils.rad2deg(angle).toFixed(2) + "°";
    },
};
exports.isFunction = function (o) {
    return !!(o && o.constructor && o.call && o.apply);
};
class NullTextElement {
    set innerText(text) {
        // do nothing
    }
}
exports.nullTextElement = new NullTextElement();
exports.queryParams = (() => {
    let cachedQueryParams = null;
    return function () {
        if (cachedQueryParams === null) {
            cachedQueryParams = new Map(window.location.search
                .substring(1)
                .split("&")
                .map(s => s.split("=")));
        }
        return cachedQueryParams;
    };
})();
