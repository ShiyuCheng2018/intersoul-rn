import Check from "../../assets/icons/check.svg";
import {View} from "react-native";

const VerifiedIcon = () =>{
    return <View style={{backgroundColor: "#4DD5FF", width: 25, height: 25, borderRadius: 36,display: "flex", alignItems: "center", justifyContent: "center"  }}>
        <Check/>
    </View>
}

export default VerifiedIcon;
