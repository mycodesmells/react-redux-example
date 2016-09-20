export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';

export const increment = () => ({
    type: INCREMENT,
    value: 2
});

export const decrement = () => ({
    type: DECREMENT,
    value: 1
});
