import React, {useState} from "react";
import {
    Alert,
    Dimensions,
    Image,
    ImageSourcePropType,
    Linking, Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../../navigations/AppNavigator";
import useUser from "../../hooks/aboutUser/useUser";
import * as Permissions from 'expo-permissions';
// import ImageCropPicker from 'react-native-image-crop-picker';

type ProfileMediaUploadScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProfileMediaUpload'>;

const { width, height } = Dimensions.get('window');

interface MediaUploadCardProps {
    imageUrl: string;
}

const MediaUploadCard: React.FC<MediaUploadCardProps> = ({ imageUrl }) => {
    return (
        <View style={{ height: height * 0.5, width: width * 0.7, borderRadius: 16 }}>
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={['#FF7074', '#FEA085']}
                className={`flex-1 w-full justify-center items-center rounded-[15px]`}  // Here we apply NativeWind styles
            >
                {imageUrl ? <Image style={{ height: "100%", width: "100%", position: "relative", top: 0 }} source={{ uri: imageUrl }}
                                   alt={"pic"} /> : ""}
            </LinearGradient>
        </View>
    );
};

const ProfileMediaUpload = ({ navigation}:{ navigation: ProfileMediaUploadScreenNavigationProp }) =>{

    const {userProfileMediasGetter} = useUser();

    const [uploadedMedias, setUploadedMedias] = useState([{
        profileMediaId: "16d94233-2a1c-4a02-9908-b7e42816d63f",
        userId: "13099d8c-6402-4838-aeb5-fa5b957b8f77",
        profileMediaTypeId: "7735187d-318d-40f8-a42b-6ae39d160df3",
        mediaPath: "https://intersoul-test.s3.us-east-1.amazonaws.com/profiles/13099d8c-6402-4838-aeb5-fa5b957b8f77/1697235570981-IMG_4649.JPG",
        order: 1
    }, {
        profileMediaId: "16d94233-2a1c-4a02-9908-b7e42816d63l",
        userId: "13099d8c-6402-4838-aeb5-fa5b957b8f77",
        profileMediaTypeId: "7735187d-318d-40f8-a42b-6ae39d160df3",
        mediaPath: "https://intersoul-test.s3.us-east-1.amazonaws.com/profiles/13099d8c-6402-4838-aeb5-fa5b957b8f77/1697235570981-IMG_4649.JPG",
        order: 2
    }]);

    const [incomingMedia, setIncomingMedia] = useState(null);

    const handlePickImage = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
            Alert.alert(
                "Permission Required",
                "We need access to your photo library to allow you to select a profile picture.",
                [
                    {
                        text: "Cancel",
                        style: "cancel"
                    },
                    {
                        text: "Open Settings",
                        onPress: () => Linking.openSettings()
                    }
                ]
            );
            return;
        }

        // ImageCropPicker.openPicker({
        //     width: width * 0.7,
        //     height: height * 0.5,
        //     cropping: true,
        // }).then(image => {
        //     const formData = new FormData();
        //     formData.append('media', {
        //         uri: Platform.OS === "android" ? image.path : image.path.replace("file://", ""),
        //         type: image.mime,
        //         name: image.filename || 'uploaded-file.jpg',
        //     } as any);
        //
        //     formData.append('mediaType', 'image');
        //
        //     for (let [key, value] of (formData as any).entries()) {
        //         console.log(key, value);
        //     }
        // });
    };


    const handleDone = () => {
        navigation.navigate('MainApp', { screen: 'Discover' });
    }

    return(
            <View className={"h-full flex justify-between items-center bg-black"}>
                <View className={"top-10 flex justify-center items-center"}>
                    <ScrollView horizontal style={{flexDirection: 'row' }} showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{display:"flex",flexDirection:"row", justifyContent: 'center', alignItems: 'center', gap:15}}>
                        {
                            uploadedMedias.map((media) => {
                                return <MediaUploadCard imageUrl={media.mediaPath} key={media.profileMediaId}/>
                            })
                        }
                    </ScrollView>
                </View>

                <View className={"bottom-20"}>
                    <TouchableOpacity className={"w-80 h-12 rounded-[36px] bg-primary flex justify-center items-center"} onPress={handlePickImage}>
                        <Text className={"text-sm text-gray-50 font-bold text-center"}>Upload</Text>
                    </TouchableOpacity>
                </View>

            </View>
    )
}


export default ProfileMediaUpload;
