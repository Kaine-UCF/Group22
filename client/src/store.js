import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

// Only chrome can handle the redux dev tools,
//Redux compose cannot handle a null or undefined middleware
  var store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware))
  );

export default store;
