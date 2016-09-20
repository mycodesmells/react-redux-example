import { INCREMENT, DECREMENT } from './actions';

const reducer = (state = {}, action) => {
    switch (action.type) {
        case INCREMENT:{
            const { score } = state;
            const { value } = action;

            return Object.assign({}, state, { score: score + value });
        }
        case DECREMENT: {
            const { score } = state;
            const { value } = action;

            return Object.assign({}, state, { score: score - value });
        }
        default:
            return state
    }
}

export default reducer;
