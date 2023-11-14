import { combineReducers } from "redux";
import app from "./app";
import entities from "./entities";
import auth from "./auth";
import upcomingProfiles from "./upcomingProfiles";

const rootReducer = combineReducers({
    app,
    entities,
    auth,
    upcomingProfiles
});


export default rootReducer;
