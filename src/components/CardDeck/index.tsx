import React, {ForwardRefRenderFunction, useCallback, useRef, useState} from "react";
import {View, StyleSheet, Image, Text, TouchableOpacity, NativeTouchEvent} from "react-native";
import Swiper from "react-native-deck-swiper";
import ElonMusk from "../../assets/profile/Elon_Musk.jpeg";
import Rachel_McAdams from "../../assets/profile/rachel_mcadams.jpeg";
import Emma_Watson from "../../assets/profile/Emma_Watson.png";
import Emma_Stone from "../../assets/profile/Emma_Stone.jpeg";
import Jennifer_Lawrence from "../../assets/profile/Jennifer_Lawrence.jpeg";
import Anne_Hathaway from "../../assets/profile/Anne_Hathaway.jpg";
import Natalie_Portman from "../../assets/profile/natalie_portman.jpg";
import Mila_Kunis from "../../assets/profile/Mila_Kunis.jpg";
import Shiyu from "../../assets/profile/shiyu.jpg";
import Tom from "../../assets/profile/tom.jpeg";
import VerifiedIcon from "../VerifiedIcon";
import DownIcon from "../DownIcon";
import {Direction} from "../../screens/Discover";

const data = [
    {
      name: "Shiyu",
      url: [Shiyu, Tom, Rachel_McAdams],
      age: 26,
    },
    {
        name: "Elon Musk",
        url: [ElonMusk, Emma_Watson, Tom, Rachel_McAdams],
        age: 26,
    },
    {
        name: "Rachel McAdams",
        url: [Rachel_McAdams],
        age: 26,
    },
    {
      name: "Tom Holland"  ,
      url: [Tom],
        age: 26,
    },
    {
        name: "Emma Watson",
        url:  [Emma_Watson],
        age: 26,
    },
    {
        name: "Emma Stone",
        url: [Emma_Stone],
        age: 26,
    },
    {
        name: "Jennifer Lawrence",
        url: [Jennifer_Lawrence],
        age: 26,
    },
    {
        name: "Anne Hathaway",
        url: [Anne_Hathaway],
        age: 26,
    },
    {
        name: "Natalie Portman",
        url: [Natalie_Portman],
        age: 26,
    },
    {
        name: "Mila Kunis",
        url: [Mila_Kunis],
        age: 26,
    }
]

type CardDeckProps = {
    setSwipingDirection: (direction: Direction) => void;
}

const SWIPE_THRESHOLD = 100;

const initializeImageIndices = (profiles:any) => {
    return new Array(profiles.length).fill(0);
};

const CardDeck: ForwardRefRenderFunction< Swiper<any>, CardDeckProps> = (props, ref ) =>{
    const {setSwipingDirection} = props;
    const nextCardReset = useRef(false);
    const [profiles, setProfiles] = useState(data); // replace YOUR_REQUEST_DATA with the response from your request
    const [imageIndices, setImageIndices] = useState(initializeImageIndices(profiles));

    const handleLeftTap = useCallback((cardIndex:number) => {
        const updatedIndices = [...imageIndices];

        if (cardIndex < profiles.length && cardIndex >= 0) {
            if (updatedIndices[cardIndex] > 0) {
                updatedIndices[cardIndex]--;
            } else {
                updatedIndices[cardIndex] = profiles[cardIndex].url.length - 1;  // wrap around to the last image
            }

            if (updatedIndices[cardIndex] !== imageIndices[cardIndex]) {
                setImageIndices(updatedIndices);
            }        }
    }, [imageIndices, profiles]);

    const handleRightTap = useCallback((cardIndex:number) => {
        const updatedIndices = [...imageIndices];

        if (cardIndex < profiles.length && cardIndex >= 0) {
            if (updatedIndices[cardIndex] < profiles[cardIndex].url.length - 1) {
                updatedIndices[cardIndex]++;
            } else {
                updatedIndices[cardIndex] = 0;
            }

            if (updatedIndices[cardIndex] !== imageIndices[cardIndex]) {
                setImageIndices(updatedIndices);
            }
        }
    }, [imageIndices, profiles]);

    const handleSwipe = () => {
        if (nextCardReset.current) {
            setImageIndices((prevIndices) => {
                const updatedIndices = [...prevIndices];
                updatedIndices[0] = 0; // Reset the next card's image index
                return updatedIndices;
            });
            nextCardReset.current = false;
        }
    };

    return(
        <View style={styles.container}>

            <Swiper ref={ref}
                containerStyle={{backgroundColor: "transparent"}}
                cards={data}
                renderCard={(card, index) => {
                    return (
                        <View style={{height: 635, width: 356, borderRadius: 16}}>

                            <TouchableOpacity
                                style={{position: 'absolute', top: 0, left: 0, width: 356/2, height: 635, zIndex: 1 }}
                                onPress={()=>handleLeftTap(index)}
                            ></TouchableOpacity>

                            {/* This touchable area is for detecting taps on the right side */}
                            <TouchableOpacity
                                style={{position: 'absolute', top: 0, right: 0, width: 356/2, height: 635, zIndex: 1 }}
                                onPress={()=>handleRightTap(index)}
                            ></TouchableOpacity>

                            <Image style={{height: "100%", width: "100%", borderRadius: 16,  position:"relative", top: 0,}} source={card.url[imageIndices[index]]}
                                   alt={"pic"}/>


                            <TouchableOpacity style={{position: "absolute", bottom: 0, borderRadius: 16, width: "100%", paddingLeft: 8, paddingBottom: 8}}>
                                <View style={{display: "flex", flexDirection: "row", alignItems: "center", gap:6, justifyContent: "space-between"}}>

                                    <View style={{display: "flex", flexDirection: "row", alignItems: "center", gap:6}}>
                                        <Text style={{color: "white", fontSize: 25, fontWeight: "bold"}}>{`${card.name}, ${card.age}`}
                                        </Text>
                                        <VerifiedIcon/>
                                    </View>

                                    <DownIcon/>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )
                }}
                    onSwiping={(x)=>{

                    if (x > SWIPE_THRESHOLD) {
                        setSwipingDirection("RIGHT");
                    } else if (x < -SWIPE_THRESHOLD) {
                        setSwipingDirection("LEFT");
                    }else {
                        setSwipingDirection(null);
                    }
                        if ((x > SWIPE_THRESHOLD || x < -SWIPE_THRESHOLD) && !nextCardReset.current) {
                            nextCardReset.current = true;
                        }

                    }}
                onSwiped={() => { handleSwipe();
                    setSwipingDirection(null);}}
                onSwipedAll={() => {console.log('onSwipedAll')}}
                cardIndex={0} stackSize={2} stackScale={8} stackSeparation={1} animateCardOpacity={true} backgroundColor={"transparent"}
                overlayLabels={{
                    left: {
                        title: 'NOPE',
                        style: {
                            label: { backgroundColor: 'transparent', color: '#FF7074', fontSize: 24 },
                            wrapper: {
                                flexDirection: 'column',
                                alignItems: 'flex-end',
                                justifyContent: 'flex-start',
                                marginTop: 20,
                                marginLeft: -20
                            }
                        }
                    },
                    right: {
                        title: 'LIKE',
                        style: {
                            label: {backgroundColor: '#FF7074', color: 'white', fontSize: 24},
                            wrapper: {
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                justifyContent: 'flex-start',
                                marginTop: 20,
                                marginLeft: 20
                            }
                        }
                    }
                }}
            />

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1, marginTop: -60,
        backgroundColor: "transparent",zIndex: 0,
    },
    card: {
        height: 642,
        width: 356,top: 0,left:0, position: "relative",
        borderWidth: 2,
        borderColor: "transparent",
        justifyContent: "center",
        backgroundColor: "white", borderRadius: 16,
    },
    text: {
        textAlign: "center",
        fontSize: 50,position:"absolute",top:0,left:0,
        backgroundColor: "transparent"
    }
});

export default React.forwardRef(CardDeck);
