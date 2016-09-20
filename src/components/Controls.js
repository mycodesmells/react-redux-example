import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const Controls = ({ decrement, increment }) => (
    <div className="controls">
        <button onClick={ decrement }> - </button>
        <button onClick={ increment }> + </button>
    </div>
)

Controls.propTypes = {
    decrement: PropTypes.func.isRequired,
    increment: PropTypes.func.isRequired
}

export default Controls;
