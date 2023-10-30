import React from "react";
import Svg, { Path } from "react-native-svg";

type CheckIconProps = {
    fill?: string | null;
    height?: number;
    width?: number;
}

const CheckIcon:React.FC<CheckIconProps> = ({
                                              fill, height, width
                                          }) => {
    return <Svg width={`${width ?? 14}`} height={`${height ?? 14}`} viewBox="0 0 14 14" fill="none" >
        <Path d="M13.7463 0.347901C13.4021 -0.115967 12.8443 -0.115967 12.5002 0.347901L4.49507 11.1368L1.50429 7.10597C1.16011 6.6421 0.60231 6.6421 0.258133 7.10597C-0.0860443 7.56984 -0.0860443 8.32162 0.258133 8.78549L3.87199 13.6561C4.03815 13.88 4.25771 14 4.49507 14C4.73244 14 4.952 13.88 5.11815 13.6561L13.7463 2.02742C14.0846 1.56355 14.0846 0.811768 13.7463 0.347901Z" fill="white"/>
    </Svg>

}

export default CheckIcon;
