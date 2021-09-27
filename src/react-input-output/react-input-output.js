import React, { createRef } from 'react';
import ReactDOM from 'react-dom';
import retargetEvents from 'react-shadow-dom-retarget-events';

import './react-input-output.css';

export class ReactInputOutput extends React.Component {
    render() {
        const { sayHello } = this.props;
        return (<h1 className="wrapper">React Input Output: <span>{sayHello}</span></h1>);
    }
}

class ReactInputOutputWebComponent extends HTMLElement {

    mountPoint;
    sayHello;

    constructor() {
        super();
        // this.elementRef = createRef();
    }

    // get sayHello() {
    //     return this.getAttribute('sayHello');
    // }

    // set sayHello(newValue) {
    //     this.setAttribute('sayHello', newValue);
    // }

    connectedCallback() {
        this.mountPoint = document.createElement('span');
        // this.appendChild(mountPoint);
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(this.mountPoint);
        
        this.sayHello = this.getAttribute('sayHello');
        ReactDOM.render(this.createReactInputOutput(this.sayHello), this.mountPoint);
        // ReactDOM.render(<ReactInputOutput sayHello={this.sayHello} />, this.mountPoint);
        retargetEvents(shadowRoot);
    }

    createReactInputOutput(sayHello) {
        return React.createElement(ReactInputOutput, { sayHello }, React.createElement('slot'));
    }

    static get observedAttributes() {
        return ['sayHello'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'sayHello':
                ReactDOM.render(this.createReactInputOutput(this.sayHello), this.mountPoint);
                // console.log(`Value changed from ${oldValue} to ${newValue}`);
                break;
        }
    }
}

window.customElements.define('react-mfe-input-output', ReactInputOutputWebComponent);
