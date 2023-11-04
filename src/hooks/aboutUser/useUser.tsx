import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {
    actions as userModulesActions, getUserRequestsStatus,
    PutUserPreferencesAction,
    PutUserProfileDetailsAction
} from "../../redux/modules/user";
import {getProfileMedias} from "../../redux/modules/entities/user";

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
    }
}

export default useUser;
