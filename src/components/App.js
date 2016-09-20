import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { increment, decrement } from '../actions';
import Score from './Score';
import Controls from './Controls';

const App = ({ score, incrementScore, decrementScore }) => (
    <div className="client">
        <Score value={ score } />
        <Controls increment={ incrementScore } decrement={ decrementScore } />
    </div>
);


App.propTypes = {
    decrementScore: PropTypes.func.isRequired,
    incrementScore: PropTypes.func.isRequired,
    score: PropTypes.number.isRequired
}

const mapStateToProps = (state) => {
    const { score } = state;
    return { score };
};
const mapDispatchToProps = (dispatch) => ({
    incrementScore: () => dispatch(increment()),
    decrementScore: () => dispatch(decrement())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
