import React, {ForwardRefRenderFunction, useCallback, useRef, useState} from "react";
import {View, StyleSheet, Image, Text, TouchableOpacity, NativeTouchEvent, Dimensions} from "react-native";
import Swiper from "react-native-deck-swiper";
import ElonMusk from "../../assets/profile/elonMusk/Elon_Musk.jpeg";
import ElonMusk_1 from "../../assets/profile/elonMusk/ElonMusk_1.jpg";
import ElonMusk_2 from "../../assets/profile/elonMusk/ElonMusk_2.jpeg";
import ElonMusk_3 from "../../assets/profile/elonMusk/ElonMusk_3.jpg";
import Rachel_McAdams from "../../assets/profile/Rachel_McAdams/rachel_mcadams.jpeg";
import Rachel_McAdams_1 from "../../assets/profile/Rachel_McAdams/Rachel_McAdams_1.jpg";
import Rachel_McAdams_2 from "../../assets/profile/Rachel_McAdams/Rachel_McAdams_2.jpeg";
import Rachel_McAdams_3 from "../../assets/profile/Rachel_McAdams/Rachel_McAdams_3.jpeg";
import Rachel_McAdams_5 from "../../assets/profile/Rachel_McAdams/Rachel_McAdams_5.jpeg";
import Rachel_McAdams_6 from "../../assets/profile/Rachel_McAdams/Rachel_McAdams_6.jpeg";
import Emma_Watson from "../../assets/profile/Emma_Watson/Emma_Watson.png";
import Emma_Watson_1 from "../../assets/profile/Emma_Watson/emma_watson_1.jpg";
import Emma_Watson_2 from "../../assets/profile/Emma_Watson/Emma_Watson_2.jpeg";
import Emma_Watson_3 from "../../assets/profile/Emma_Watson/Emma_Watson_3.jpg";
import Emma_Watson_4 from "../../assets/profile/Emma_Watson/Emma_Watson_4.jpeg";
import Emma_Stone from "../../assets/profile/Emma_Stone/Emma_Stone.jpeg";
import Jennifer_Lawrence from "../../assets/profile/Jennifer_Lawrence/Jennifer_Lawrence.jpeg";
import Anne_Hathaway from "../../assets/profile/Anne_Hathaway/Anne_Hathaway.jpg";
import Natalie_Portman from "../../assets/profile/Natalie_Portman/natalie_portman.jpg";
import Mila_Kunis from "../../assets/profile/Mila_Kunis/Mila_Kunis.jpg";
import Shiyu from "../../assets/profile/shiyu/shiyu.jpg";
import Tom from "../../assets/profile/Tom/tom.jpeg";
import Tom_1 from "../../assets/profile/Tom/Tom_Holland_1.jpg";
import Tom_2 from "../../assets/profile/Tom/Tom_Holland_3.jpeg";
import Tom_3 from "../../assets/profile/Tom/Tom_Holland_2.jpg";
import VerifiedIcon from "../VerifiedIcon";
import DownIcon from "../DownIcon";
import {Direction} from "../../screens/Discover";
import * as Haptics from 'expo-haptics';
import {LinearGradient} from "expo-linear-gradient";
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;


const data = [
    {
        id: 0,
      name: "Shiyu",
      url: [Shiyu],
      age: 26,
      profession: "Software Engineer at HyperOracle"
    },
    { id:1,
        name: "Elon Musk",
        url: [ElonMusk, ElonMusk_1, ElonMusk_2, ElonMusk_3],
        age: 26,
        profession: "CEO of Tesla"
    },
    {id: 2,
        name: "Rachel McAdams",
        url: [Rachel_McAdams, Rachel_McAdams_1, Rachel_McAdams_2, Rachel_McAdams_3, Rachel_McAdams_5, Rachel_McAdams_6],
        age: 26,
        profession: "UI/UX Designer"
    },
    {id: 3,
      name: "Tom Holland"  ,
      url: [Tom, Tom_1, Tom_2, Tom_3],
        age: 26,
        profession: "Actor / film director"
    },
    {id:4,
        name: "Emma Watson",
        url:  [Emma_Watson, Emma_Watson_1, Emma_Watson_2, Emma_Watson_3, Emma_Watson_4],
        age: 26,
        profession: "Actress / film director / writer"
    },
    {id: 5,
        name: "Emma Stone",
        url: [Emma_Stone],
        age: 26,
        profession: "Architect"
    },
    {id: 6,
        name: "Jennifer Lawrence",
        url: [Jennifer_Lawrence],
        age: 26,
        profession: "Investor/ film director / writer"
    },
    {id: 7,
        name: "Anne Hathaway",
        url: [Anne_Hathaway],
        age: 26,
        profession: "Investor/ film director / writer"
    },
    {id: 8,
        name: "Natalie Portman",
        url: [Natalie_Portman],
        age: 26,
        profession: "Investor/ film director / writer"
    },
    {id: 9,
        name: "Mila Kunis",
        url: [Mila_Kunis],
        age: 26,
        profession: "Investor/ film director / writer"
    }
]

type CardDeckProps = {
    setSwipingDirection: (direction: Direction) => void;
    viewProfileDetail: (userId: string) => void;
}

const SWIPE_THRESHOLD = 100;

const initializeImageIndices = (profiles:any) => {
    return new Array(profiles.length).fill(0);
};

const CardDeck: ForwardRefRenderFunction< Swiper<any>, CardDeckProps> = (props, ref ) =>{
    const {setSwipingDirection, viewProfileDetail} = props;
    const nextCardReset = useRef(false);
    const [profiles, setProfiles] = useState(data); // replace YOUR_REQUEST_DATA with the response from your request
    const [imageIndices, setImageIndices] = useState(initializeImageIndices(profiles));


    const renderImageIndicator = (currentIndex: number, totalImages: number) => {
        return (
            <View style={{    position: 'absolute', zIndex: 1,
                top: 10,
                margin: "auto", justifyContent: "center", alignItems: "center",
                flexDirection: 'row',
            }}>
                {Array.from({ length: totalImages }).map((_, index) => (
                    <View key={index} style={[
                        {width: 10,
                            height: 10,
                            borderRadius: 36,
                            marginHorizontal: 4,
                            backgroundColor: 'white',
                            opacity: 0.5},
                        currentIndex === index && {opacity: 1}
                    ]} />
                ))}
            </View>
        );
    };


    const handleLeftTap = useCallback((cardIndex:number) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
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
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
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
                        <View style={{height: screenHeight * 0.76, width: screenWidth * 0.90, borderRadius: 16, alignItems: "center",display: "flex", justifyContent:"center", position: "relative"}}>

                            <TouchableOpacity
                                style={{position: 'absolute', top: 0, left: 0, width: screenWidth * 0.90 / 2, height: screenHeight * 0.76, zIndex: 1}}
                                onPress={()=>handleLeftTap(index)}
                            ></TouchableOpacity>

                            {/* This touchable area is for detecting taps on the right side */}
                            <TouchableOpacity
                                style={{position: 'absolute', top: 0, right: 0, width: screenWidth * 0.90 / 2, height: screenHeight * 0.76, zIndex: 1}}
                                onPress={()=>handleRightTap(index)}
                            ></TouchableOpacity>

                            {renderImageIndicator(imageIndices[index], card.url.length)}
                            <Image style={{height: "100%", width: "100%", borderRadius: 16,  position:"relative", top: 0,}} source={card.url[imageIndices[index]]}
                                           alt={"pic"}/>


                            <TouchableOpacity onPress={()=>viewProfileDetail(card.id)} style={{position: "absolute",zIndex: 1, bottom: 0, borderBottomLeftRadius: 16, borderBottomRightRadius: 16,paddingTop: 20, width: "100%", paddingLeft: 8, paddingBottom: 20, backgroundColor: 'rgba(0,0,0,0.35)'}}>
                                <View style={{display: "flex", flexDirection: "row", alignItems: "center", gap:6, justifyContent: "space-between"}}>

                                    <View style={{display: "flex", flexDirection: "column", gap: 3}}>
                                        <View style={{display: "flex", flexDirection: "row", alignItems: "center", gap:6}}>
                                            <Text style={{color: "white", fontSize: 25, fontWeight: "bold"}}>{`${card.name}, ${card.age}`}
                                            </Text>
                                            <VerifiedIcon height={25} width={25}/>
                                        </View>
                                        <Text style={{color: "white", fontSize: 15}}>{`${card.profession}`}</Text>
                                        <Text style={{color: "white", fontSize: 15}}>2.5km away</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                                {/*<LinearGradient*/}
                                {/*    colors={['transparent', '#020202']}*/}
                                {/*    style={{height: "30%", width: "100%",bottom: 0,position: "absolute",borderRadius: 16}}  // Here we apply NativeWind styles*/}
                                {/*></LinearGradient>*/}
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
        flex: 1, marginTop: -(screenHeight * 0.072),
        backgroundColor: "transparent",zIndex: 0,
        height: screenHeight,
        width: screenWidth,
    },

    text: {
        textAlign: "center",
        fontSize: 50,position:"absolute",top:0,left:0,
        backgroundColor: "transparent"
    }
});

export default React.forwardRef(CardDeck);
