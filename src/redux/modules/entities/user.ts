import {types as authModuleTypes} from "../auth";

/***********************************************************************************************************************
 * 													STATE 														   *
 * *********************************************************************************************************************/
type ProfileMediasProps = {
    profileMediaId: string,
    "userId": string,
    "profileMediaTypeId": string,
    "mediaPath": string,
    "order": number
}

type LocationProps = {
    locationId: string,
    userId: string,
    longitude: number,
    latitude: number,
    country: string,
    state: string,
    city: string
}

export type AfterLogInScreen = "Discover" | "ProfileCreation" | "ProfileMediaUpload"

type initialStateProps = {
    userId: string | null,
    userName: string | null,
    dateOfBirth: string | null,
    email: string | null,
    profileMedias: Array<ProfileMediasProps>,
    isVerified: boolean,
    isProfileComplete: boolean,
    location: LocationProps | null,
    jobTitle: string | null,
    bodyTypeId: string | null,
    height: number | null,
    genderId: string | null,
    profileDescription: string,
    afterLogInScreens: Array<AfterLogInScreen>
}

const initialState: initialStateProps = {
    userId: null,
    userName: null,
    dateOfBirth: null,
    email: null,
    profileMedias: [],
    isVerified: false,
    isProfileComplete: false,
    location: null,
    jobTitle: null,
    bodyTypeId: null,
    height: null,
    genderId: null,
    profileDescription: "",
    afterLogInScreens: []
}

/***********************************************************************************************************************
 * 													SCHEMA 														   *
 * *********************************************************************************************************************/
export const schema = {
    name: "user",
    id: "id",
};

/***********************************************************************************************************************
 * 													REDUCERS 														   *
 * *********************************************************************************************************************/

const reducer = (state = initialState, action:any) => {
    switch (action.type) {
        case authModuleTypes.EMAIL_PASSWORD_LOGIN.success():
            const user = action.response.user;
            delete user.provider;
            delete user.providerId;

            let screens:Array<AfterLogInScreen> = [];
            if(!user.isProfileComplete){
                if(!user.userName ||
                    !user.dateOfBirth ||
                    !user.bodyTypeId ||
                    !user.height ||
                    !user.genderId ||
                    !user.profileDescription
                ) screens.push("ProfileCreation");

                if(user.profileMedias.length === 0) screens.push("ProfileMediaUpload");
                // if(!user.location) screens.push("Location");
            }

            return {...state, ...user, afterLogInScreens: [...screens, "Discover"]};
        default:
            return state;
    }
}


export default reducer;


/***********************************************************************************************************************
 * 													SELECT  														   *
 * *********************************************************************************************************************/
export const getAfterLogInScreens = (state: any) => state.entities.user.afterLogInScreens;
