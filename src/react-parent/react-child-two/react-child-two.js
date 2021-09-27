import React from 'react';
import { Link } from 'react-router-dom';

import './react-child-two.css';

export class ReactChildTwo extends React.Component {
    render() {
        return (
            <div className="purple-wrapper">
                <h1>React Child Two</h1>

                <button><Link to={`/react-parent`}>Parent</Link></button>
                <button><Link to={`/react-parent/child-one`}>Child One</Link></button>
            </div>
        );
    }
}