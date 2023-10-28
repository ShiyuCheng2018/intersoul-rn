import CardActionsContext from "../contexts/CardActionsContext";
import {useContext} from "react";


const useCardActions = () => useContext(CardActionsContext);


export default useCardActions;
