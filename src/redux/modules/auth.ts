/***********************************************************************************************************************
 * 													CONSTANTS 														   *
 * *********************************************************************************************************************/
import actionTypesConstructor from "../utils/actionTypesConstructor";
import dispatchActions from "../utils/dispatchActions";
import {POST_DATA} from "../middlewares/api";
import url from "../../utils/url";

export const types = {
    EMAIL_PASSWORD_LOGIN: actionTypesConstructor("APP|AUTH|[REQUEST]|EMAIL_PASSWORD_LOGIN",
        "APP|AUTH|[SUCCESS]|EMAIL_PASSWORD_LOGIN",
        "APP|AUTH|[FAILURE]|EMAIL_PASSWORD_LOGIN"),
    EMAIL_PASSWORD_SIGNUP: actionTypesConstructor("APP|AUTH|[REQUEST]|EMAIL_PASSWORD_SIGNUP",
        "APP|AUTH|[SUCCESS]|EMAIL_PASSWORD_SIGNUP",
        "APP|AUTH|[FAILURE]|EMAIL_PASSWORD_SIGNUP"),
    UPDATE_ACCESS_TOKEN: "APP|AUTH|[UPDATE]|UPDATE_ACCESS_TOKEN"
}

/***********************************************************************************************************************
 * 													STATE   														   *
 * *********************************************************************************************************************/

const initialState = {
    isEmailPasswordLogin: false,
    isEmailPasswordSignup: false,
}

/***********************************************************************************************************************
 * 													ACTIONS 														   *
 * *********************************************************************************************************************/
export const actions = {
    updateAccessToken:(token:string) => ({
        type: types.UPDATE_ACCESS_TOKEN,
        payload: token
    }),
    emailPasswordLogin: (data: {email: string, password: string}) => {
        return async (dispatch: any, getState:any) => {
            const endpoint = url.emailPasswordLogin();
            return await dispatch(
                dispatchActions(
                    POST_DATA,
                    types.EMAIL_PASSWORD_LOGIN.all(),
                    endpoint,
                    null,
                    JSON.stringify(data),
                )
            );
        }
    },
    emailPasswordSignup: (data: {email: string, password: string}) => {
        return async (dispatch: any) => {
            const endpoint = url.emailPasswordSignUp();
            await dispatch(
                dispatchActions(
                    POST_DATA,
                    types.EMAIL_PASSWORD_SIGNUP.all(),
                    endpoint,
                    data,
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
        case types.EMAIL_PASSWORD_LOGIN.request():
            return { ...state, isEmailPasswordLogin: true };
        case types.EMAIL_PASSWORD_LOGIN.success():
            return { ...state, isEmailPasswordLogin: false };
        case types.EMAIL_PASSWORD_LOGIN.failure():
            return { ...state, isEmailPasswordLogin: false };
        case types.EMAIL_PASSWORD_SIGNUP.request():
            return { ...state, isEmailPasswordSignup: true };
        case types.EMAIL_PASSWORD_SIGNUP.success():
            return { ...state, isEmailPasswordSignup: false };
        case types.EMAIL_PASSWORD_SIGNUP.failure():
            return { ...state, isEmailPasswordSignup: false };
        default:
            return state;
    }
}

export default reducer;

/***********************************************************************************************************************
 * 													SELECT  														   *
 * *********************************************************************************************************************/
export const getJWT = (state:any) => state.entities.auth.jwt;
