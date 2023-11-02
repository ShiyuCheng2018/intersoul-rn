import { combineReducers } from "redux";
import app from "./app";
import entities from "./entities";
import auth from "./auth";

const rootReducer = combineReducers({
    app,
    entities,
    auth
});


export default rootReducer;
