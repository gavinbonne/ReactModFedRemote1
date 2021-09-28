import React from 'react';
import registerWebComponent from '../utils/register-web-component';
import './react-input-output.css';

export class ReactInputOutput extends React.Component {
    render() {
        const { say_hello, selected_option } = this.props;
        return (
            <div className="wrapper">
                <h1>React Input Output</h1>

                <div>Say Hello: {say_hello}</div>
                <div>Selected Options: {JSON.stringify(selected_option)}</div>
            </div>
        );
    }
}

registerWebComponent(ReactInputOutput, 'react-mfe-input-output');
