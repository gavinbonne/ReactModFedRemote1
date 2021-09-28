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
import registerWebComponent from '../utils/register-web-component';
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

const reactParentRouter = class extends React.Component {
    render() {
        const { match } = this.props;

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
const ReactParentRouter = withRouter(reactParentRouter);
export default ReactParentRouter;

class ReactParentRouterMount extends React.Component {
    render() {
        const { updated_url } = this.props;
        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        {/* <Redirect exact from="/" to="/react-parent" /> */}
                        <Route path="/react-parent">
                            <ReactParentRouter />
                        </Route>
                        <Redirect from="*" to='/react-parent' />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

registerWebComponent(ReactParentRouterMount, 'react-mfe-parent');
