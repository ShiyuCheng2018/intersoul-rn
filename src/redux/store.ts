import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import {deleteAPI, fetchAPI, postAPI, putAPI} from "./middlewares/api";
import rootReducer from "./modules";
import { composeWithDevTools } from 'redux-devtools-extension';
import { Store } from 'redux';

const middleware = [thunk, fetchAPI, postAPI, putAPI, deleteAPI];
const enhancer = applyMiddleware(...middleware);

let store: Store;
if (__DEV__) {
    store = createStore(rootReducer, composeWithDevTools(enhancer));
} else {
    store = createStore(rootReducer, enhancer);
}

export default store;
