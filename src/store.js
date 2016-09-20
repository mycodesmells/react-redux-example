import { createStore, compose, applyMiddleware } from 'redux';

import rootReducer from './reducer';

function configureStore() {
    return createStore(rootReducer, { score: 2 }, window.devToolsExtension && window.devToolsExtension());
}

export default configureStore;
