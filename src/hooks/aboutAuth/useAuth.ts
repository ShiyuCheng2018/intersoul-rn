import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import {actions as authModulesActions} from "../../redux/modules/auth";

const useAuth = () =>{

    const dispatch = useDispatch();
    const automationDispatcher = bindActionCreators(
        authModulesActions,
        dispatch
    );

    return {
        emailPasswordRegister: (data:{email: string, password: string}) => automationDispatcher.emailPasswordSignup(data),
        emailPasswordSignIn: (data:{email: string, password: string}) => automationDispatcher.emailPasswordLogin(data),
    }
}

export default useAuth;
