import {types as authModuleTypes} from "../auth";

/***********************************************************************************************************************
 * 													STATE 														   *
 * *********************************************************************************************************************/
const initialState = {
    providerId: null,
    provider: null,
    jwt: null
}

/***********************************************************************************************************************
 * 													REDUCERS 														   *
 * *********************************************************************************************************************/
const reducer = (state = initialState, action:any) => {
    switch (action.type) {
        case authModuleTypes.UPDATE_ACCESS_TOKEN:
            return {
                ...state,
                jwt: action.payload
            };
        case authModuleTypes.EMAIL_PASSWORD_LOGIN.success():
            const jwt = action.response.accessToken;
            return {...state, provider: action.response.user.provider, jwt};
        default:
            return state;
    }
}


export default reducer;



/***********************************************************************************************************************
 * 													SELECT  														   *
 * *********************************************************************************************************************/
