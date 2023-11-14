import actionTypesConstructor from "../utils/actionTypesConstructor";
import url from "../../utils/url";
import dispatchActions from "../utils/dispatchActions";
import {FETCH_DATA} from "../middlewares/api";
import {schema as upcomingProfilesSchema, UpcomingProfile} from "../modules/entities/upcomingProfiles";
import {createSelector} from "reselect";
/***********************************************************************************************************************
 * 													CONSTANTS 														   *
 * *********************************************************************************************************************/
export const types = {
    FETCH_PROFILES: actionTypesConstructor("APP|USER|[REQUEST]|FETCH_PROFILES",
        "APP|USER|[SUCCESS]|FETCH_PROFILES",
        "APP|USER|[FAILURE]|FETCH_PROFILES"),
}

/***********************************************************************************************************************
 * 													STATE   														   *
 * *********************************************************************************************************************/
const initialState = {
    upcomingProfileUserIds: [],
    isFetchingProfiles: false,
}

/***********************************************************************************************************************
 * 													ACTIONS 														   *
 * *********************************************************************************************************************/
export const actions = {
    fetchProfiles: () => {
        return async (dispatch: any) => {
            const endpoint = url.fetchProfiles();
            return await dispatch(
                dispatchActions(
                    FETCH_DATA,
                    types.FETCH_PROFILES.all(),
                    endpoint,upcomingProfilesSchema
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
        case types.FETCH_PROFILES.request():
            return { ...state, isFetchingProfiles: true };
        case types.FETCH_PROFILES.success():
            return { ...state, isFetchingProfiles: false, upcomingProfileUserIds: action.response.ids};
        case types.FETCH_PROFILES.failure():
            return { ...state, isFetchingProfiles: false };
        default:
            return state;
    }
}

export default reducer;


/***********************************************************************************************************************
 * 													SELECT  														   *
 * *********************************************************************************************************************/

const upcomingProfileUserIds = (state: any) => state.upcomingProfiles.upcomingProfileUserIds;
const upcomingProfilesEntities = (state: any) => state.entities.upcomingProfiles;

export const getUpcomingProfiles = createSelector(
    [upcomingProfileUserIds, upcomingProfilesEntities],
    (userIds:Array<string>, profiles:{[userId: string] : UpcomingProfile}) => userIds.map(id => profiles[id])
);

export const getUpcomingProfileById = createSelector(
    [upcomingProfileUserIds, upcomingProfilesEntities, (_, id) => id],
    (userIds, profiles, id) => userIds.includes(id) && profiles[id]
);
