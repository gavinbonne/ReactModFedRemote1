import React from 'react';
import PropTypes from 'prop-types';
import registerWebComponent from '../utils/register-web-component';
import './react-input-output.css';

class ReactInputOutput extends React.Component {

    constructor(props) {
        super(props);
        this.buttonClicked = this.buttonClicked.bind(this);
    }

    buttonClicked(e) {
        e.preventDefault();
        if (this.props['when_counter_incremented']) {
            this.props.when_counter_incremented({ detail: 'Please increment the counter.' });
        }
    }

    render() {
        const { red_alert, say_hello, selected_option } = this.props;
        return (
            <div className="wrapper">
                <h1>React Input Output</h1>

                <div>Say Hello: {say_hello}</div>
                <div>Red Alert: {JSON.stringify(red_alert)}</div>
                <div>Selected Options: {JSON.stringify(selected_option)}</div>

                <button onClick={this.buttonClicked}>Increment Counter</button>
            </div>
        );
    }
}

ReactInputOutput.propTypes = {
    red_alert: PropTypes.bool,
    say_hello: PropTypes.string,
    selected_option: PropTypes.object,
    when_counter_incremented: PropTypes.func
};

export default ReactInputOutput;

registerWebComponent(ReactInputOutput, 'react-mfe-input-output');
