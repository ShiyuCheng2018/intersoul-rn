import React, {useState} from "react";
import {
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../../navigations/AppNavigator";
import DateTimePicker from '@react-native-community/datetimepicker';
import {useNavigation} from "@react-navigation/native";
import MaleIcon from "../../assets/icons/MaleIcon";
import FemaleIcon from "../../assets/icons/FemaleIcon";
import Modal from "react-native-modal";
import {getKeyByValueFromGenderEntity} from "../../constants/genderEntity";
import useUser from "../../hooks/aboutUser/useUser";
type ProfileCreationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProfileCreation'>;

const GENDERS = {
    MALE: "Male",
    "FEMALE": "Female",
    OTHER: "Other"
}

const ProfileCreation = () =>{
    const [userName, setUserName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState<null | Date>(null);
    const [openBirthdayPicker, setOpenBirthdayPicker] = useState(false)
    const [genderId, setGenderId] = useState('');
    const [genderPreferenceId, setGenderPreferenceId] = useState('');
    const [profileDescription, setProfileDescription] = useState('');
    const [errors, setErrors] = useState("");

    const navigation = useNavigation<ProfileCreationScreenNavigationProp>();
    const scrollViewRef = React.useRef<ScrollView>(null);
    const {userPreferencesPutter, userDetailsPutter} = useUser();

    const handleProfileCreation = async () => {
        if(userName.length === 0 || !dateOfBirth || genderId.length === 0 || profileDescription.length === 0){
            setErrors("Please fill all the fields");
            return;
        }
        await userDetailsPutter({userName, dateOfBirth, genderId, profileDescription});
        await userPreferencesPutter({genderPreferenceId});
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1}}
        >
            <ScrollView className={"h-auto"} ref={scrollViewRef} style={{ flex: 1, backgroundColor: 'black' }}
                        contentContainerStyle={{ backgroundColor: 'black' }}>
                <View className={"flex flex-col justify-between items-center bg-black h-auto pb-10"}>
                    <View className={"p-5 flex gap-10"}>
                        <View className={"pt-10"}>
                            <View className={"bottom-2"}>
                                <Text className={"text-sm text-white font-medium"}>Username</Text>
                            </View>
                            <TextInput textContentType={"username"} value={userName}
                                       onChangeText={(text) => setUserName(text)}
                                       placeholder="Enter username"
                                       className='flex py-3 px-4 bg-gray-50 text-primary w-80 h-22 rounded-[36px]'
                            />
                        </View>

                        <View>
                            <View className={"bottom-2"}>
                                <Text className={"text-sm text-white font-medium"}>Birthday</Text>
                            </View>
                            <TouchableOpacity  className='flex py-3 px-4 bg-gray-50 w-80 h-22 rounded-[36px]'
                                               onPress={() => setOpenBirthdayPicker(true)}
                            >
                                <Text className={"text-gray-400"}>{dateOfBirth? dateOfBirth.toDateString() : "Enter your birthday"}</Text>
                            </TouchableOpacity>
                        </View>

                        <View>
                            <View className={"bottom-2"}>
                                <Text className={"text-sm text-white  font-medium"}>Gender</Text>
                            </View>
                            <View className={"flex flex-row justify-around items-center"}>
                                <TouchableOpacity onPress={()=>setGenderId(getKeyByValueFromGenderEntity(GENDERS.MALE) as string)} style={{height: 60, width: 60}} className={"bg-gray-100 bg-black justify-around items-center rounded-[36px]"}>
                                    <MaleIcon fill={genderId===(getKeyByValueFromGenderEntity(GENDERS.MALE) as string) ? "skyblue" : null}/>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={()=>setGenderId(getKeyByValueFromGenderEntity(GENDERS.FEMALE) as string)} style={{height: 60, width: 60}} className={"bg-gray-100 bg-black justify-around items-center rounded-[36px]"}>
                                    <FemaleIcon fill={genderId===(getKeyByValueFromGenderEntity(GENDERS.FEMALE) as string) ? "lightpink" : null}/>
                                </TouchableOpacity>

                            </View>
                        </View>

                        <View>
                            <View className={"bottom-2"}>
                                <Text className={"text-sm text-white font-medium"}>Would like to match with</Text>
                            </View>
                            <View className={"flex flex-row justify-around items-center"}>
                                <TouchableOpacity onPress={()=>setGenderPreferenceId(getKeyByValueFromGenderEntity(GENDERS.MALE) as string)} style={{height: 60, width: 60}} className={"bg-gray-100 bg-black  justify-around items-center rounded-[36px]"}>
                                    <MaleIcon fill={genderPreferenceId===(getKeyByValueFromGenderEntity(GENDERS.MALE) as string) ? "skyblue" : null}/>
                                </TouchableOpacity>
                                <TouchableOpacity  onPress={()=>setGenderPreferenceId(getKeyByValueFromGenderEntity(GENDERS.FEMALE) as string)} style={{height: 60, width: 60}} className={"bg-gray-100 bg-black  justify-around items-center rounded-[36px]"}>
                                    <FemaleIcon fill={genderPreferenceId===(getKeyByValueFromGenderEntity(GENDERS.FEMALE) as string) ? "lightpink" : null}/>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View>
                            <View className={"bottom-2"}>
                                <Text className={"text-sm text-black font-medium"}>About me</Text>
                            </View>
                            <TextInput style={{height: 5 * 16 + 80}} onFocus={() => {
                                setTimeout(() => {
                                    scrollViewRef.current?.scrollTo({ y: 450, animated: true });
                                }, 100);  // Adjust the delay as needed
                            }} value={profileDescription} onChangeText={(text) => setProfileDescription(text)}
                                       placeholder="What would you say about yourslef?" multiline={true} numberOfLines={10} maxLength={100}
                                       className='flex py-3 px-4 bg-gray-50 w-80 h-22 rounded-2xl text-gray-500'
                            />
                        </View>
                    </View>


                    <View className={"bottom-5 top-1"}>
                        <TouchableOpacity className={"w-80 h-12 rounded-[36px] bg-primary flex justify-center items-center"} onPress={handleProfileCreation}>
                            <Text className={"text-sm text-gray-50 font-bold text-center"}>Next</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <Modal
                isVisible={openBirthdayPicker}
                onBackdropPress={() => setOpenBirthdayPicker(false)}
                style={{justifyContent: 'center', margin: 0, backgroundColor: "rgba(0,0,0,0.8)"}}
            >
                <DateTimePicker
                    testID="dateTimePicker" style={{}} textColor={"white"}
                    value={dateOfBirth ?? new Date()}
                    mode={'date'}
                    is24Hour={true}
                    display="spinner"
                    onChange={(event, selectedDate) => {
                        const currentDate = selectedDate || new Date();
                        setOpenBirthdayPicker(Platform.OS === 'ios');
                        setDateOfBirth(currentDate);
                    }}
                    maximumDate={new Date(new Date().setFullYear(new Date().getFullYear() - 18))}
                    minimumDate={new Date(new Date().setFullYear(new Date().getFullYear() - 100))}
                />
            </Modal>
        </KeyboardAvoidingView>
    )
}

export default ProfileCreation;
