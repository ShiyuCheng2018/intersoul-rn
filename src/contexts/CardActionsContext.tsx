import React, {createContext, ReactNode, useRef, useState} from "react";
import Swiper from "../components/Swiper";

type DirectionsType = {
    right: Direction,
    left: Direction,
    _: Direction
}
export const DIRECTIONS:DirectionsType = {
    right: "RIGHT",
    left: "LEFT",
    _: null
}

export type Direction = "RIGHT" | "LEFT" | null;

type initialStateType = {
    swipeDirection: Direction,
    swiperRef: React.RefObject<Swiper<any>> | null,
    setSwipingDirection: (direction: Direction) => void
}


const CardActionsContext: React.Context<initialStateType> = createContext<initialStateType>({
    swipeDirection: null,
    swiperRef:null,
    setSwipingDirection: (direction: Direction) => {}
})

type CardActionsProviderProps = {
    children: ReactNode | undefined
}

export const CardActionsProvider = (props: CardActionsProviderProps) => {
    const { children } = props;
    // State for swipe direction
    const [swipeDirection, setSwipeDirection] = useState<Direction>(null);

    // Ref for swiper
    const swiperRef = useRef<Swiper<any>>(null);

    // Method to set swipe direction
    const setSwipingDirection = (direction: Direction) => {
        setSwipeDirection(direction);
    }

    return (
        <CardActionsContext.Provider value={{ swipeDirection, swiperRef, setSwipingDirection }}>
            {children}
        </CardActionsContext.Provider>
    );
}

export default CardActionsContext;
