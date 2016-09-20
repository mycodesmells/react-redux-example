import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const Score = ({ value }) => <div className="score">{ value }</div>

Score.propTypes = {
    value: PropTypes.number.isRequired
}

export default Score;
