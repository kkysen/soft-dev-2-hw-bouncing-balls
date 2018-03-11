declare interface Object {
    
    freeze<T>(this: T): T;
    
    seal<T>(this: T): T;
    
    clone<T>(this: T): T;
    
}

declare interface ObjectConstructor {
    
    defineSharedProperties(object: any, sharedDescriptor: PropertyDescriptor, propertyValues: Object);
    
}

Object.defineProperties(Object, {
    
    defineSharedProperties: {
        writable: false,
        enumerable: false,
        configurable: false,
        value(obj: any, sharedDescriptor: PropertyDescriptor, propertyValues: Object) {
            const properties: PropertyDescriptorMap & ThisType<any> = {};
            for (const value in propertyValues) {
                if (propertyValues.hasOwnProperty(value)) {
                    properties[value] = Object.assign({value: propertyValues[value]}, sharedDescriptor);
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
    
    clone() {
        return Object.assign({}, this);
    },
    
});

declare interface Element {
    
    clearHTML(): void;
    
    setAttributes(attributes: {[name: string]: any}): void;
    
}

Element.prototype.clearHTML = function() {
    this.innerHTML = "";
};

Element.prototype.setAttributes = function(attributes: {[name: string]: any}) {
    for (const attribute in attributes) {
        if (attributes.hasOwnProperty(attribute) && attributes[attribute]) {
            this.setAttribute(attribute, attributes[attribute].toString());
        }
    }
};

declare interface HTMLElement {
    
    appendNewElement<K extends keyof HTMLElementTagNameMap>(tagName: K): HTMLElementTagNameMap[K];
    
    appendNewElement(tagName: string): HTMLElement;
    
    appendDiv(): HTMLDivElement;
    
    appendButton(buttonText: string): HTMLButtonElement;
    
    appendBr(): HTMLBRElement;
    
    withInnerText(text: string): HTMLElement;
    
}

HTMLElement.prototype.appendNewElement = function(tagName: string): HTMLElement {
    return this.appendChild(document.createElement(tagName));
};

HTMLElement.prototype.appendDiv = function(): HTMLDivElement {
    return this.appendNewElement("div");
};

HTMLElement.prototype.appendButton = function(buttonText: string): HTMLButtonElement {
    const button = this.appendNewElement("button");
    button.innerText = buttonText;
    return button;
};

HTMLElement.prototype.appendBr = function(): HTMLBRElement {
    return this.appendNewElement("br");
};

HTMLElement.prototype.withInnerText = function(text: string): HTMLElement {
    this.innerText = text;
    return this;
};