import {useDispatch, useSelector} from "react-redux";
import { bindActionCreators } from "redux";
import {
    actions as appActions,
    getErrorCode,
    getErrorMeg,
} from "../redux/modules/app";

const useError = () => {
    const dispatch = useDispatch();
    const clearError = bindActionCreators(appActions.clearError, dispatch);
    const errorMeg = useSelector((state) => getErrorMeg(state));
    const errorCode = useSelector((state) => getErrorCode(state));

    return { clearError, errorCode, errorMeg };
};

export default useError;
