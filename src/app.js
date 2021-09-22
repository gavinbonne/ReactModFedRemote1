import React from 'react';
import ReactDOM from 'react-dom';

import './app.css';
import { ReactTile } from './react-tile/react-tile';

class App extends React.Component {
    render() {
        return (<ReactTile/>);
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
