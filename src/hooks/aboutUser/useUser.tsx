import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {
    actions as userModulesActions, getUserRequestsStatus,
    PutUserPreferencesAction,
    PutUserProfileDetailsAction
} from "../../redux/modules/user";
import {determineNextOnboardingScreen, getProfileMedias, getUserGeoLocation} from "../../redux/modules/entities/user";

const useUser = () =>{
    const dispatch = useDispatch();
    const userDispatcher = bindActionCreators(
        userModulesActions,
        dispatch
    );

    return {
        userDetailsPutter: (data:PutUserProfileDetailsAction) => userDispatcher.putUserProfileDetails(data),
        userPreferencesPutter: (data:PutUserPreferencesAction) => userDispatcher.putUserPreferences(data),
        userRequestsStatusGetter: useSelector((state)=>getUserRequestsStatus(state)),
        userProfileMediasGetter: useSelector((state)=>getProfileMedias(state)),
        userProfileMediaAdder: (data:any) => userDispatcher.postProfileMedia(data),
        userProfileMediaDeleter: (mediaId:string) => userDispatcher.deleteUserProfileMediaByMediaId(mediaId),
        userGeoLocationGetter: useSelector((state)=>getUserGeoLocation(state)),
        nextOnboardingScreenGetter: useSelector((state) => determineNextOnboardingScreen(state)),
        userLocationPoster: (data: {latitude: number, longitude: number}) => userDispatcher.postUserLocation(data)
    }
}

export default useUser;
