import actionTypesConstructor from "../utils/actionTypesConstructor";
import url from "../../utils/url";
import dispatchActions from "../utils/dispatchActions";
import {PUT_DATA} from "../middlewares/api";

/***********************************************************************************************************************
 * 													CONSTANTS 														   *
 * *********************************************************************************************************************/
export const types = {
    PUT_USER_PROFILE_DETAILS: actionTypesConstructor("APP|USER|[REQUEST]|PUT_USER_PROFILE_DETAILS",
        "APP|USER|[SUCCESS]|PUT_USER_PROFILE_DETAILS",
        "APP|USER|[FAILURE]|PUT_USER_PROFILE_DETAILS"),
    PUT_USER_PREFERENCES: actionTypesConstructor("APP|USER|[REQUEST]|PUT_USER_PREFERENCES",
        "APP|USER|[SUCCESS]|PUT_USER_PREFERENCES",
        "APP|USER|[FAILURE]|PUT_USER_PREFERENCES")
}

/***********************************************************************************************************************
 * 													STATE   														   *
 * *********************************************************************************************************************/
const initialState = {
    isPuttingUserProfileDetails: false,
    isPuttingUserPreferences: false,
}

/***********************************************************************************************************************
 * 													ACTIONS 														   *
 * *********************************************************************************************************************/
export type PutUserProfileDetailsAction = {
 userName: string, dateOfBirth: Date, genderId: string, profileDescription: string, height?: number,bodyType?: string
}

export type PutUserPreferencesAction = {
minAge?:number, maxAge?:number, minDistance?:number, maxDistance?:number, minHeight?:number, maxHeight?:number, bodyTypePreferenceId?:string, genderPreferenceId?:string
}

export const actions = {
    putUserProfileDetails: (data: PutUserProfileDetailsAction) => {
        return async (dispatch: any) => {
            const endpoint = url.putProfileDetails();
            await dispatch(
                dispatchActions(
                    PUT_DATA,
                    types.PUT_USER_PROFILE_DETAILS.all(),
                    endpoint,null,
                    JSON.stringify(data),
                )
            )
        }
    },
    putUserPreferences: (data: PutUserPreferencesAction) =>{
        return async (dispatch: any) => {
            const endpoint = url.putPreferences();
            await dispatch(
                dispatchActions(
                    PUT_DATA,
                    types.PUT_USER_PREFERENCES.all(),
                    endpoint,null,
                    JSON.stringify(data),
                )
            )
        }
    }
}

/***********************************************************************************************************************
 * 													REDUCERS 														   *
 * *********************************************************************************************************************/
const reducer = (state = initialState, action:any) => {
    switch (action.type) {
        case types.PUT_USER_PROFILE_DETAILS.request():
            return { ...state, isPuttingUserProfileDetails: true };
        case types.PUT_USER_PROFILE_DETAILS.success():
            return { ...state, isPuttingUserProfileDetails: false };
        case types.PUT_USER_PROFILE_DETAILS.failure():
            return { ...state, isPuttingUserProfileDetails: false };
        case types.PUT_USER_PREFERENCES.request():
            return { ...state, isPuttingUserPreferences: true };
        case types.PUT_USER_PREFERENCES.success():
            return { ...state, isPuttingUserPreferences: false };
        case types.PUT_USER_PREFERENCES.failure():
            return { ...state, isPuttingUserPreferences: false };
        default:
            return state;
    }
}

export default reducer;


/***********************************************************************************************************************
 * 													SELECT  														   *
 * *********************************************************************************************************************/
export const getUserRequestsStatus = (state: any) => state.user;
