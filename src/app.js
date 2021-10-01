import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';

import './app.css';
import ReactInputOutput from './react-input-output/react-input-output';
import ReactParentRouter from './react-parent/react-parent';
import { ReactTile } from './react-tile/react-tile';

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <nav>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/react-parent">React Parent</Link></li>
                            <li><Link to="/react-tile">React Tile</Link></li>
                            <li><Link to="/react-input-output">React Input Output</Link></li>
                        </ul>
                    </nav>

                    <Switch>
                        <Redirect exact from="/" to="/react-parent" />
                        <Route path="/react-parent" component={ReactParentRouter} />
                        <Route path="/react-tile" component={ReactTile} />
                        <Route path="/react-input-output" component={ReactInputOutput} />
                        <Redirect from="*" to='/react-parent' />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
