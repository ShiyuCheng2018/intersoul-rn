import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {
    actions as upcomingProfilesModulesActions,
    getUpcomingProfileById,
    getUpcomingProfiles
} from "../../redux/modules/upcomingProfiles";
import {useCallback} from "react";

const useUpcomingProfiles = () =>{
    const dispatch = useDispatch();
    const upcomingProfilesDispatcher = bindActionCreators(
        upcomingProfilesModulesActions,
        dispatch
    );



    return {
        upcomingProfilesFetcher: () => upcomingProfilesDispatcher.fetchProfiles(),
        upcomingProfilesGetter: useSelector((state:any) => getUpcomingProfiles(state)),
    }
}

export default useUpcomingProfiles;
