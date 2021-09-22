import React from 'react';
import ReactDOM from 'react-dom';

import './react-tile.css';

export class ReactTile extends React.Component {
    render() {
        return (<h1 className="wrapper">React Tile</h1>);
    }
}

class ReactTileWebComponent extends HTMLElement {
    connectedCallback() {
        ReactDOM.render(<ReactTile/>, this);
    }
}

customElements.define('react-mfe-element', ReactTileWebComponent);
