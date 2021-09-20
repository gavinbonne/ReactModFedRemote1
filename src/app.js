import React from 'react'
import ReactDOM from 'react-dom'
import './App.css';

class App extends React.Component {

    render() {
        return (<h1 className="wrapper">React MFE</h1>);
    }
}

// ReactDOM.render(
//     <App/>,
//     document.getElementById('root')
// );

class ReactMfeElement extends HTMLElement {
    connectedCallback() {
        ReactDOM.render(<App/>, this);
    }
}

customElements.define('react-mfe-element', ReactMfeElement);
