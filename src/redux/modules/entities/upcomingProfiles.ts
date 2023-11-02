
/***********************************************************************************************************************
 * 													STATE 														   *
 * *********************************************************************************************************************/
type ProfileMedia = {
    profileMediaId: string,
    profileMediaTypeId: string,
    mediaPath: string,
    order: number
}

type UpcomingProfile = {
    id: string,
    username: string,
    dateOfBirth: string,
    jobTitle: string,
    bodyTypeId: null,
    height: null,
    profileImages: Array<ProfileMedia>,
    genderId: null,
    isProfileComplete: false,
    location: null,
    isVerified: false,
    profileDescription: string,
}

const initialState:Array<UpcomingProfile> = [];

/***********************************************************************************************************************
 * 													SCHEMA 														   *
 * *********************************************************************************************************************/
export const schema = {
    name: "upcomingProfiles",
    id: "id",
};

/***********************************************************************************************************************
 * 													REDUCERS 														   *
 * *********************************************************************************************************************/

const reducer = (state = initialState, action:any) => {
    switch (action.type) {
        default:
            return state;
    }
}


export default reducer;
