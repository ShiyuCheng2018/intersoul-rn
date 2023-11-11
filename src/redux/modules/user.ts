import actionTypesConstructor from "../utils/actionTypesConstructor";
import url from "../../utils/url";
import dispatchActions from "../utils/dispatchActions";
import {DELETE_DATA, POST_DATA, PUT_DATA} from "../middlewares/api";

/***********************************************************************************************************************
 * 													CONSTANTS 														   *
 * *********************************************************************************************************************/
export const types = {
    PUT_USER_PROFILE_DETAILS: actionTypesConstructor("APP|USER|[REQUEST]|PUT_USER_PROFILE_DETAILS",
        "APP|USER|[SUCCESS]|PUT_USER_PROFILE_DETAILS",
        "APP|USER|[FAILURE]|PUT_USER_PROFILE_DETAILS"),
    PUT_USER_PREFERENCES: actionTypesConstructor("APP|USER|[REQUEST]|PUT_USER_PREFERENCES",
        "APP|USER|[SUCCESS]|PUT_USER_PREFERENCES",
        "APP|USER|[FAILURE]|PUT_USER_PREFERENCES"),
    POST_USER_PROFILE_MEDIA: actionTypesConstructor("APP|USER|[REQUEST]|POST_USER_PROFILE_MEDIA",
        "APP|USER|[SUCCESS]|POST_USER_PROFILE_MEDIA",
        "APP|USER|[FAILURE]|POST_USER_PROFILE_MEDIA"),
    DELETE_USER_PROFILE_MEDIA: actionTypesConstructor("APP|USER|[REQUEST]|DELETE_USER_PROFILE_MEDIA",
        "APP|USER|[SUCCESS]|DELETE_USER_PROFILE_MEDIA",
        "APP|USER|[FAILURE]|DELETE_USER_PROFILE_MEDIA"),
    POST_USER_LOCATION: actionTypesConstructor("APP|USER|[REQUEST]|POST_USER_LOCATION",
        "APP|USER|[SUCCESS]|POST_USER_LOCATION",
        "APP|USER|[FAILURE]|POST_USER_LOCATION"),
}

/***********************************************************************************************************************
 * 													STATE   														   *
 * *********************************************************************************************************************/
const initialState = {
    isPuttingUserProfileDetails: false,
    isPuttingUserPreferences: false,
    isPostingUserProfileMedia: false,
    isPostingUserLocation: false,
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
    postProfileMedia: (data: any) => {
        return async (dispatch: any) => {
            const endpoint = url.addProfileMedia();
            await dispatch(
                dispatchActions(
                    POST_DATA,
                    types.POST_USER_PROFILE_MEDIA.all(),
                    endpoint,null,
                    data,
                )
            )
        }
    },
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
    },
    deleteUserProfileMediaByMediaId: (mediaId: string) => {
        return async (dispatch: any) => {
            const endpoint = url.deleteProfileMediaByMediaId(mediaId);
            await dispatch(
                dispatchActions(
                    DELETE_DATA,
                    types.DELETE_USER_PROFILE_MEDIA.all(),
                    endpoint,null, {mediaId}
                )
            )
        }
    },
    postUserLocation: (data: {longitude: number,
        latitude: number}) => {
        return async (dispatch: any) => {
            const endpoint = url.postUserLocation();
            await dispatch(
                dispatchActions(
                    POST_DATA,
                    types.POST_USER_LOCATION.all(),
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
        case types.POST_USER_PROFILE_MEDIA.request():
            return { ...state, isPostingUserProfileMedia: true };
        case types.POST_USER_PROFILE_MEDIA.success():
            return { ...state, isPostingUserProfileMedia: false };
        case types.POST_USER_PROFILE_MEDIA.failure():
            return { ...state, isPostingUserProfileMedia: false };
        case types.DELETE_USER_PROFILE_MEDIA.request():
            return { ...state, isDeletingUserProfileMedia: true };
        case types.DELETE_USER_PROFILE_MEDIA.success():
            return { ...state, isDeletingUserProfileMedia: false };
        case types.DELETE_USER_PROFILE_MEDIA.failure():
            return { ...state, isDeletingUserProfileMedia: false };
        default:
            return state;
    }
}

export default reducer;


/***********************************************************************************************************************
 * 													SELECT  														   *
 * *********************************************************************************************************************/
export const getUserRequestsStatus = (state: any) => state.user;
