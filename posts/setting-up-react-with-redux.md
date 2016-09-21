# Setting up React with redux

Managing state of a single-page application is probably the most important issue a web developer faces. For quite some time, one of the most popular approaches to this problem is something called a one-direction data flow. And probably the most common implementation, which gained a lot of ground to become very popular, is Redux. Creating React applications with Redux is extremely easy, thanks to react-redux package. Let's create a simple app to show how Redux works.

### Idea of Redux

There are two main concepts that you have to keep in mind with Redux. First of all, it separates your code into two levels: one initializes changes to the application state, while the other watches that state and updates themselves (most commonly their UI) on any occurring changes. This also leads to the second aspect, which is one-direction data flow: once a change is initialized, it goes into the state and is being read by appropriate components. No shortcuts there, all changes go through the same _pipe_ so that you can watch everything that is happening all the time.

### Redux building blocks

Redux is composed of three main elements:
- store
- actions
- reducers

**Store** is the center point of any redux-based application. This is an object that contains information about everything within the app. A well-designed store allows you to determine everything about the application's view, behavior etc. solely basing on its content (ie. you know what subpage is opened, what data is displayed and what interactions are possible at the moment). Most often, a state is just a JSON object containing all the data in the system.

Additionally, we can create our store with a connection to a [developer tool](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) (that allows us to see all state changes eg. in Chrome). In order to do that, we need to pass `window.devToolsExtension()` as an attribute to Redux's `createStore` function.

**Actions** are the definitions of changes that can be made to the state. They are defined as objects that have a `type` attribute, which is later used to determine what kind of change it is. Obviously, all actions can contain some custom payload containing any additional information that is necessary to make changes to the state.

**Reducers** are functions that take action and state as parameters and return an updated state. They are very often built as `switch` statements, making specific operations depending on `action.type`. It is important to make sure that state is immutable, ie. you need to return a new state object, not change existing one (as this might not be recognized as a change to the state object on the UI side).

    // actions.js
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


    // reducer.js
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


    // store.js
    import { createStore } from 'redux';
    import reducer from './reducer';

    function configureStore() {
        return createStore(reducer, { score: 2 }, window.devToolsExtension && window.devToolsExtension());
    }

    export default configureStore;

### Binding Redux to my application

Once we create our actions, reducers, and store, we need to bind them somehow to the React application, right? There are two things that we need to do here. First of all, our root component must be wrapped with a `Provider` component, which takes our store as an argument.

    import React from 'react';
    import { render } from 'react-dom';
    import { Provider } from 'react-redux';

    import configureStore from './store';

    import App from './components/App';

    render(
        <Provider store={ configureStore() }>
            <App />
        </Provider>,
        document.getElementById('app')
    );


Then, in the component itself, instead of exporting a plain old React component, we `connect` (name of the function BTW) it to the state and actions using two (or three) functions:
- **mapStateToProps** takes an application state as an argument, and what is returned is passed as props to the component. For better performance, you should limit props list to the minimum, so that here is the place where you need to select what exactly is necessary for given component to be rendered properly,


    const mapStateToProps = (state) => {
        const { itemID } = state;
        return { itemID };
    };

- **mapDispatchToProps** this function takes one parameter commonly referred as `dispatch` - this is a function which should be called with an action as its argument, which causes our action to be sent towards our state (via reducers). Again, everything that is returned from this, is being passed as props to the component,


    const mapDispatchToProps = (dispatch) => ({
        deleteByID: (id) => dispatch(deleteAction(id))
    });

- **mergeProps** is an optional third argument, which allows you to combine properties returned from the first two functions. It is useful if any actions depend on the state so that you need to create a property with some arguments already read from the state:


    const mergeProps = (stateProps, dispatchProps) => ({
        itemID: stateProps.itemID,
        deleteItem: () => dispatchProps.deleteByID(stateProps.itemID)
    });

This way you don't need to pass any parameter to the delete function within the container, as you know that there is just one possible value there.

Our example root component can look like this:

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

### Summary

As you can see, adding Redux to a react application does not require too much effort. At the same time, you gain a pretty powerful way to handle your application state with immutability, and functional programming. Last, but not least, you can easily see all the changes (and even do some time-travelling) with Redux developer tool. I totally recommend it!

Example code is available [on Github](https://github.com/mycodesmells/react-redux-example).
