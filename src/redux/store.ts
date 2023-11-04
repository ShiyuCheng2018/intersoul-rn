import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import {fetchAPI, postAPI, putAPI} from "./middlewares/api";
import rootReducer from "./modules";
import reactotronInstance from "../../ReactotronConfig";
import { Store } from 'redux';

let store:Store;
let middleware = [thunk, fetchAPI, postAPI, putAPI];
let enhancer = applyMiddleware(...middleware);

if (__DEV__) {
    const reactotron = reactotronInstance;
    reactotron.initiate();
    store =  createStore(rootReducer, compose(enhancer, reactotron.createEnhancer()));
}else {
    store = createStore(rootReducer, enhancer);
}

export default store;
