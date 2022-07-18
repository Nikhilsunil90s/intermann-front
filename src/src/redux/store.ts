// import { combineReducers, applyMiddleware, compose } from "redux";
// import { configureStore } from '@reduxjs/toolkit';


// import { createStore} from 'redux';
// import createSagaMiddleware from 'redux-saga';

// import rootReducer from '../reducers';
// import rootSaga from '../sagas';

// const configureStore = () => {
//   const sagaMiddleware = createSagaMiddleware();

//   return {
//     ...createStore(rootReducer, applyMiddleware(sagaMiddleware)),
//     runSaga: sagaMiddleware.run(rootSaga)
//   }
// };

// export default configureStore;

import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga'
import rootReducer from "./reducers/rootReducer"
import {rootSaga} from './rootSaga'

const sagaMiddleware = createSagaMiddleware()
 const configureStore = createStore(
rootReducer,
applyMiddleware(sagaMiddleware),
);
sagaMiddleware.run(rootSaga)
export default configureStore;