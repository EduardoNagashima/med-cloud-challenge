import {createStore, applyMiddleware} from "redux";
import {createSagaMiddleware} from "redux-saga"
import rootReducer from "./reducers";

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store

export * from './actions';
export * from './types';
