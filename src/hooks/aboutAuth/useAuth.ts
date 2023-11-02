import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {actions as authModulesActions, getJWT} from "../../redux/modules/auth";
import {getAfterLogInScreens} from "../../redux/modules/entities/user";

const useAuth = () =>{

    const dispatch = useDispatch();
    const automationDispatcher = bindActionCreators(
        authModulesActions,
        dispatch
    );

    return {
        emailPasswordRegister: (data:{email: string, password: string}) => automationDispatcher.emailPasswordSignup(data),
        emailPasswordSignIn: (data:{email: string, password: string}) => automationDispatcher.emailPasswordLogin(data),
        afterLogInScreensGetter: useSelector(state => getAfterLogInScreens(state)),
        jwtGetter: useSelector((state) => getJWT(state)),
    }
}

export default useAuth;
