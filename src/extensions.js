Object.defineProperties(Object, {
    defineSharedProperties: {
        writable: false,
        enumerable: false,
        configurable: false,
        value(obj, sharedDescriptor, propertyValues) {
            const properties = {};
            for (const value in propertyValues) {
                if (propertyValues.hasOwnProperty(value)) {
                    properties[value] = Object.assign({ value: propertyValues[value] }, sharedDescriptor);
                }
            }
            Object.defineProperties(obj, properties);
        },
    },
});
Object.defineSharedProperties(Object.prototype, {
    writable: false,
    enumerable: false,
    configurable: false,
}, {
    freeze() {
        return Object.freeze(this);
    },
    seal() {
        return Object.seal(this);
    },
    _clone() {
        return Object.assign({}, this);
    },
});
Element.prototype.clearHTML = function () {
    this.innerHTML = "";
};
Element.prototype.setAttributes = function (attributes) {
    for (const attribute in attributes) {
        if (attributes.hasOwnProperty(attribute) && attributes[attribute]) {
            this.setAttribute(attribute, attributes[attribute].toString());
        }
    }
};
HTMLElement.prototype.appendNewElement = function (tagName) {
    return this.appendChild(document.createElement(tagName));
};
HTMLElement.prototype.appendDiv = function () {
    return this.appendNewElement("div");
};
HTMLElement.prototype.appendButton = function (buttonText) {
    const button = this.appendNewElement("button");
    button.innerText = buttonText;
    return button;
};
HTMLElement.prototype.appendBr = function () {
    return this.appendNewElement("br");
};
HTMLElement.prototype.withInnerText = function (text) {
    this.innerText = text;
    return this;
};
