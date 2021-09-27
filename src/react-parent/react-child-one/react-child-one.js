import React from 'react';
import { Link } from 'react-router-dom';

import './react-child-one.css';

export class ReactChildOne extends React.Component {
    render() {
        return (
            <div className="green-wrapper">
                <h1>React Child One</h1>

                <button><Link to={`/react-parent`}>Parent</Link></button>
                <button><Link to={`/react-parent/child-two`}>Child Two</Link></button>
            </div>
        );
    }
}