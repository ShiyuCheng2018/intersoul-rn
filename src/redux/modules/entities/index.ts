import {combineReducers} from "redux";
import user from "./user";
import auth from "./auth";
import upcomingProfiles from "./upcomingProfiles";
import verification from "./verification";

const rootReducer = combineReducers({
    auth,
    user,
    verification,
    upcomingProfiles,
});

export default rootReducer;
