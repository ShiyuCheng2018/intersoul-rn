import Check from "../../assets/icons/check.svg";
import {View} from "react-native";
import CheckIcon from "../../assets/icons/CheckIcon";

const VerifiedIcon = ({height, width}:{height: number, width: number}) =>{
    return <View style={{backgroundColor: "#4DD5FF", width: width ?? 25, height: height ?? 25, borderRadius: 36,display: "flex", alignItems: "center", justifyContent: "center"  }}>
        <CheckIcon height={height/2} width={width/2}/>
    </View>
}

export default VerifiedIcon;
