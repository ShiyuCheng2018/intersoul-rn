import React from "react";
import Svg, { Path } from "react-native-svg";

type LikeThemeProps = {
    fill?: string | null;
    height?: number;
    width?: number;
}

const Dislike:React.FC<LikeThemeProps> = ({
    fill, height, width
                 }) => {
    return <Svg width={`${width??23}`} height={`${height??23}`} viewBox="0 0 23 23" fill="none" >
        <Path id="dislike icon" d="M12.9 11.275L22.1 2.075C22.3 1.875 22.5 1.575 22.5 1.275C22.5 0.975 22.4 0.675 22.1 0.475C21.6 -0.025 20.9 -0.025 20.4 0.475L11.2 9.675L2 0.375C1.5 -0.125 0.8 -0.125 0.3 0.375C0.1 0.675 0 0.975 0 1.275C0 1.575 0.1 1.875 0.4 2.075L9.6 11.275L0.4 20.475C0.1 20.675 0 20.975 0 21.275C0 21.575 0.1 21.875 0.4 22.075C0.9 22.575 1.6 22.575 2.1 22.075L11.3 12.875L20.5 22.075C20.7 22.275 21 22.475 21.3 22.475C21.6 22.475 21.9 22.375 22.1 22.075C22.3 21.875 22.5 21.575 22.5 21.275C22.5 20.975 22.4 20.675 22.1 20.475L12.9 11.275Z" fill={`${fill?? '#FE877C'}`}/>
    </Svg>
}

export default Dislike;


