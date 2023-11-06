import {types as authModuleTypes} from "../auth";
import {types as userModuleTypes} from "../user";

/***********************************************************************************************************************
 * 													STATE 														   *
 * *********************************************************************************************************************/
export type ProfileMediasProps = {
    profileMediaId: string,
    userId: string,
    profileMediaTypeId: string,
    mediaPath: string,
    order: number
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

type preferencesProps = {
    preferenceId: string | null,
    userId: string | null,
    genderPreferenceId: string | null,
    minHeight: number | null,
    maxHeight: number | null,
    bodyTypePreferenceId: string | null,
    minDistance: number | null,
    maxDistance: number | null,
    minAge: number | null,
    maxAge: number | null
}

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
    afterLogInScreens: Array<AfterLogInScreen>,
    preferences: preferencesProps
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
    afterLogInScreens: [],
    preferences: {
        preferenceId: null,
        userId: null,
        genderPreferenceId: null,
        minHeight: null,
        maxHeight: null,
        bodyTypePreferenceId: null,
        minDistance: null,
        maxDistance: null,
        minAge: null,
        maxAge: null
    }
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
                    // !user.bodyTypeId ||
                    // !user.height ||
                    !user.genderId ||
                    !user.profileDescription || !user.preferences.genderPreferenceId
                ) screens.push("ProfileCreation");

                if(user.profileMedias.length === 0) screens.push("ProfileMediaUpload");
                // screens.push("ProfileMediaUpload");
                // if(!user.location) screens.push("Location");
            }
            return {...state, ...user, afterLogInScreens: [...screens, "Discover"]};
        case userModuleTypes.PUT_USER_PROFILE_DETAILS.success():
            console.log(action)
            return {...state, ...action.payload, isProfileComplete: action.response.isProfileComplete,afterLogInScreens: state.afterLogInScreens[0]=== "ProfileCreation" ? ["ProfileMediaUpload", "Discover"] : [...state.afterLogInScreens]};
        case userModuleTypes.PUT_USER_PREFERENCES.success():
            return {...state, preferences: {...state.preferences, ...action.payload}};
        case userModuleTypes.POST_USER_PROFILE_MEDIA.success():
            return {...state, profileMedias: [...action.response.userProfileMedias], afterLogInScreens: state.afterLogInScreens[0]=== "ProfileMediaUpload" ? ["Discover"] : [...state.afterLogInScreens]};
        case userModuleTypes.DELETE_USER_PROFILE_MEDIA.success():
            const mediaId =  action.payload.mediaId;
            return {...state, profileMedias: [...state.profileMedias.filter((media:ProfileMediasProps) => media.profileMediaId !== mediaId)]};
        default:
            return state;
    }
}


export default reducer;


/***********************************************************************************************************************
 * 													SELECT  														   *
 * *********************************************************************************************************************/
export const getAfterLogInScreens = (state: any) => state.entities.user.afterLogInScreens;

export const getProfileMedias = (state: any) => state.entities.user.profileMedias;

export const getUserGeoLocation = (state: any) => {
    if(!state.entities.user.isProfileComplete) return null;
    state.entities.user.location
};
