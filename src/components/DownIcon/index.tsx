import Down from "../../assets/icons/down.svg";
import {View} from "react-native";

const DownIcon = () =>{
    return <View style={{alignContent:"flex-end", marginRight:8,backgroundColor: "#FE877C", width: 25, height: 25, borderRadius: 36,display: "flex", alignItems: "center", justifyContent: "center"  }}>
        <Down/>
    </View>
}


export default DownIcon;
