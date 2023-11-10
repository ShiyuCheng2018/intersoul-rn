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
import { PERMISSIONS, request } from 'react-native-permissions';
import ImageCropPicker from 'react-native-image-crop-picker';
import {ProfileMediasProps} from "../../redux/modules/entities/user";
import Modal from "react-native-modal";

type ProfileMediaUploadScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProfileMediaUpload'>;

const { width, height } = Dimensions.get('window');

interface MediaUploadCardProps {
    imageUrl: string;
}

const MediaUploadCard: React.FC<MediaUploadCardProps> = ({ imageUrl }) => {
    return (
        <View style={{ height: height * 0.5, width: width * 0.7, borderRadius: 16 }} key={imageUrl}>
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
    const [mediaCardModal, setMediaCardModal] = useState<{isOpen: boolean, media: {mediaId: null|string,mediaPath: string }}>({
        isOpen: false, media: {mediaId: null, mediaPath: ""}
    });

    const {userProfileMediaAdder, userProfileMediasGetter, userProfileMediaDeleter} = useUser();


    const handlePickImage = async () => {
        try {
            const status = await request(
                Platform.OS === 'ios'
                    ? PERMISSIONS.IOS.PHOTO_LIBRARY
                    : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
            );

            if (status !== 'granted') {
                Alert.alert(
                    "Permission Required",
                    "We need access to your photo library to allow you to select a profile picture.",
                    [
                        { text: "Cancel", style: "cancel" },
                        { text: "Open Settings", onPress: () => Linking.openSettings() }
                    ]
                );
                return;
            }

            //Open the image picker
            const image = await ImageCropPicker.openPicker({
                width: Math.round(width * 0.7),
                height: Math.round(height * 0.5),
                cropping: true,
            });

            // Prepare form data
            const formData = new FormData();
            formData.append('media', {
                uri: Platform.OS === "android" ? image.path : image.path.replace("file://", ""),
                type: image.mime,
                name: image.filename || 'uploaded-file.jpg',
            } as any);

            // TODO: choose media type based on the media
            formData.append('mediaType', '7735187d-318d-40f8-a42b-6ae39d160df3');

            // Upload the media
            userProfileMediaAdder(formData);
        } catch (error) {
            console.error(error);
        }
    };

    return(
            <View className={"h-full flex-1 justify-between items-center bg-black"}>

                <View className={"top-10 flex justify-center items-center"}>
                    <ScrollView horizontal style={{flexDirection: 'row' }} showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{display:"flex",flexDirection:"row", justifyContent: 'center', alignItems: 'center', gap:15}}>
                        {
                            userProfileMediasGetter.map((media:ProfileMediasProps) => {
                                return <TouchableOpacity key={media.profileMediaId} onPress={()=>setMediaCardModal({isOpen: true, media: {mediaId: media.profileMediaId, mediaPath: media.mediaPath}})}>
                                    <MediaUploadCard imageUrl={media.mediaPath}/>
                                </TouchableOpacity>
                            })
                        }
                    </ScrollView>
                </View>

                <View className={"bottom-20"}>
                    <TouchableOpacity className={"w-80 h-12 rounded-[36px] bg-primary flex justify-center items-center"} onPress={handlePickImage}>
                        <Text className={"text-sm text-gray-50 font-bold text-center"}>Upload</Text>
                    </TouchableOpacity>
                </View>

                <Modal isVisible={mediaCardModal.isOpen as boolean} backdropOpacity={1}
                       onBackdropPress={() => setMediaCardModal({isOpen: false, media: {mediaId: null, mediaPath: ""}})}
                       style={{flex: 1, justifyContent: "flex-end",gap:height/5,
                           bottom: 10, alignItems: "center"}}>
                    <View>
                        <MediaUploadCard imageUrl={mediaCardModal.media.mediaPath}/>
                    </View>
                    <TouchableOpacity disabled={!mediaCardModal.media.mediaId || userProfileMediasGetter.length === 1} className={"w-80 h-12 rounded-[36px] bg-primary flex justify-center items-center"}
                                      onPress={()=>{userProfileMediaDeleter(mediaCardModal.media.mediaId as string); setMediaCardModal({isOpen: false, media: {mediaId: null, mediaPath: ""}})}}>
                        <Text className={"text-sm text-gray-50 font-bold text-center"}>Delete</Text>
                    </TouchableOpacity>
                </Modal>

            </View>
    )
}


export default ProfileMediaUpload;
