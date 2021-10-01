import React from 'react';
import ReactDOM from 'react-dom';

export default function registerWebComponent(ComponentRef, name) {
    const WebComponent = class extends HTMLElement {
        constructor() {
            super();
            this.observer = new MutationObserver(() => this.update());
            this.observer.observe(this, { attributes: true });
        }

        connectedCallback() {
            this.mount();
        }

        disconnectedCallback() {
            this.unmount();
            this.observer.disconnect();
        }

        update() {
            this.unmount();
            this.mount();
        }

        mount() {
            const props = {
                ...this.getProps(this.attributes),
                ...this.getEvents()
            };
            ReactDOM.render(<ComponentRef {...props} />, this);
        }

        unmount() {
            ReactDOM.unmountComponentAtNode(this);
        }

        getProps(attributes) {
            return [...attributes]
                .filter(attr => attr.name !== 'style')
                .map(attr => this.convert(attr.name, attr.value))
                .reduce((props, prop) => ({ ...props, [prop.name]: prop.value }), {})
        }

        getEvents() {
            return Object.values(this.attributes)
                .filter(key => /when([a-z]*_*)*/.exec(key.name))
                .reduce((events, ev) => ({
                    ...events,
                    [ev.name]: args => this.dispatchEvent(new CustomEvent(ev.name, { ...args }))
                }), {});
        }

        convert(attrName, attrValue) {
            let value = attrValue;
            if (attrValue === 'true' || attrValue === 'false') {
                value = attrValue === 'true';
            } else if (!isNaN(attrValue) && attrValue !== '') {
                value = +attrValue;
            } else if (/^{.*}/.exec(attrValue)) {
                value = JSON.parse(attrValue);
            }

            return {
                name: attrName,
                value: value
            };
        }
    }

    customElements.define(name, WebComponent);
}



// ALTERNATE IMPLEMENTATION

// class ReactInputOutputWebComponent extends HTMLElement {

//     mountPoint;
//     sayHello;

//     // get sayHello() {
//     //     return this.getAttribute('sayHello');
//     // }

//     // set sayHello(newValue) {
//     //     this.setAttribute('sayHello', newValue);
//     // }

//     static get observedAttributes() {
//         return ['sayHello'];
//     }

//     constructor() {
//         super();
//     }

//     connectedCallback() {
//         // this.mountPoint = document.createElement('span');
//         // const shadowRoot = this.attachShadow({ mode: 'open' });
//         // shadowRoot.appendChild(this.mountPoint);
        
//         // this.sayHello = this.getAttribute('sayHello');
//         // ReactDOM.render(this.createReactInputOutput(this.sayHello), this.mountPoint);
//         // retargetEvents(shadowRoot);

//         ReactDOM.render(<ReactInputOutput sayHello={this.sayHello} />, this);
//     }

//     disconnectedCallback() {
//         ReactDOM.unmountComponentAtNode(this);
//     }

//     createReactInputOutput(sayHello) {
//         return React.createElement(ReactInputOutput, { sayHello }, React.createElement('slot'));
//     }

//     attributeChangedCallback(name, oldValue, newValue) {
//         switch (name) {
//             case 'sayHello':
//                 // ReactDOM.render(this.createReactInputOutput(this.sayHello), this.mountPoint);
//                 this.sayHello = newValue;
//                 ReactDOM.render(<ReactInputOutput sayHello={this.sayHello} />, this);
//                 break;
//         }
//     }
// }

// window.customElements.define('react-mfe-input-output', ReactInputOutputWebComponent);
