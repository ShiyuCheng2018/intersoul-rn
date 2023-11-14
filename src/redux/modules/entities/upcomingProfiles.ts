import {types as upcomingProfilesTypes} from "../upcomingProfiles";
/***********************************************************************************************************************
 * 													STATE 														   *
 * *********************************************************************************************************************/
type ProfileMedia = {
    profileMediaTypeId: string,
    mediaPath: string,
    order: number
}

export type UpcomingProfile = {
    id: string,
    username: string,
    dateOfBirth: string,
    jobTitle: string,
    bodyTypeId: null,
    height: null,
    profileMedia: Array<ProfileMedia>,
    genderId: null,
    isProfileComplete: false,
    location: null,
    isVerified: false,
    profileDescription: string,
}

type InitialStateType = {
    [userId: string]: UpcomingProfile
}

const initialState:InitialStateType = {};

/***********************************************************************************************************************
 * 													SCHEMA 														   *
 * *********************************************************************************************************************/
export const schema = {
    name: "upcomingProfiles",
    id: "userId",
};

/***********************************************************************************************************************
 * 													REDUCERS 														   *
 * *********************************************************************************************************************/

const reducer = (state = initialState, action:any) => {
    switch (action.type) {
        case upcomingProfilesTypes.FETCH_PROFILES.success():
            const newProfiles = action.response.upcomingProfiles;
            // Check for actual changes before updating state
            const isDifferent = Object.keys(newProfiles).some(
                key => !state[key] || (state[key] && JSON.stringify(state[key]) !== JSON.stringify(newProfiles[key]))
            );

            if (isDifferent) {
                // Merge new profiles into existing state
                return { ...state, ...newProfiles };
            }
        default:
            return state;
    }
}


export default reducer;
