import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter,
    Link,
    Switch,
    Redirect,
    Route,
    withRouter
} from 'react-router-dom';
import { ReactChildOne } from './react-child-one/react-child-one';
import { ReactChildTwo } from './react-child-two/react-child-two';

import './react-parent.css';

class ReactParent extends React.Component {
    render() {
        let match = this.props.match;

        return (
            <div className="react-parent-wrapper">
                <h1>React Parent</h1>

                <button><Link to={`${match.url}/child-one`}>Child One</Link></button>
                <button><Link to={`${match.url}/child-two`}>Child Two</Link></button>
            </div>
        )
    };
}

class ReactParentRouter extends React.Component {
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.onRouteChanged();
        }
    }

    onRouteChanged() {
        console.log("ROUTE CHANGED");
        this.render();
    }

    render() {
        let match = this.props.match;

        return (
            <Switch>
                <Route exact path={`${match.path}`} component={ReactParent} />
                <Route exact path={`${match.path}/child-one`} component={ReactChildOne} />
                <Route exact path={`${match.path}/child-two`} component={ReactChildTwo} />
                <Redirect from="*" to='/react-parent' />
            </Switch>
        );
    }
}
const ReactParentRouterWithRouter = withRouter(ReactParentRouter);
export default ReactParentRouterWithRouter;

class ReactParentRouterWebComponent extends HTMLElement {
    connectedCallback() {
        const mountPoint = document.createElement('span');
        this.appendChild(mountPoint);
        // this.attachShadow({ mode: 'open' }).appendChild(mountPoint);
        const test = this.getAttribute('test');

        ReactDOM.render(
            <div>
                <BrowserRouter>
                    <Switch>
                        {/* <Redirect exact from="/" to="/react-parent" /> */}
                        <Route path="/react-parent">
                            <ReactParentRouterWithRouter test={test} />
                        </Route>
                        <Redirect from="*" to='/react-parent' />
                    </Switch>
                </BrowserRouter>
            </div>,
            mountPoint
        );
    }
}

customElements.define('react-mfe-parent', ReactParentRouterWebComponent);
