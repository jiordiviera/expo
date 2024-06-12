import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    Text,
    Button,
    Image,
    ScrollView,
    TouchableOpacity,
    Modal,
    Dimensions,
} from "react-native";
import { User } from "@firebase/auth-types";
import { firebaseOnAuthStateChanged, firebaseSignOut } from "@/services/auth";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "@expo/vector-icons/Ionicons"; // Importation des icônes

export default function Register() {
    const [user, setUser] = useState<User | null>(null);
    const handleUserChange = (user: User | null) => {
        setUser(user);
    };

    const handleSignOut = async () => {
        await firebaseSignOut();
    };

    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isImageModalVisible, setIsImageModalVisible] = useState(false);

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
            setIsImageModalVisible(false);
        } else {
            alert("You did not select any image.");
        }
    };

    const takePhotoAsync = async () => {
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
            setIsImageModalVisible(false);
        } else {
            alert("You did not take a photo.");
        }
    };

    const handleProfileImageChange = async () => {
        setIsImageModalVisible(true);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.profileContainer}>
                <TouchableOpacity
                    style={styles.avatarContainer}
                    onPress={() => setIsImageModalVisible(true)}
                >
                    <Image
                        source={
                            selectedImage
                                ? { uri: selectedImage }
                                : require("@/assets/images/adaptive-icon.png")
                        }
                        style={styles.avatar}
                    />
                    <Ionicons
                        name="camera"
                        size={24}
                        color="#fff"
                        style={styles.cameraIcon}
                    />
                </TouchableOpacity>
                <Text style={styles.userName}>
                    {user?.email ?? "Utilisateur non authentifié"}
                </Text>
                {/* Affichez un statut si nécessaire */}
                {/* <Text style={styles.userStatus}>Statut de l'utilisateur</Text> */}
            </View>

            <View style={styles.optionsContainer}>
                <TouchableOpacity style={styles.option} onPress={handleSignOut}>
                    <Text style={styles.optionText}>Se déconnecter</Text>
                </TouchableOpacity>
                {/* Ajoutez d'autres options si nécessaire */}
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isImageModalVisible}
                onRequestClose={() => setIsImageModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.imagePreviewContainer}>
                        <Image
                            source={
                                selectedImage
                                    ? { uri: selectedImage }
                                    : require("@/assets/images/adaptive-icon.png")
                            }
                            style={styles.imagePreview}
                        />
                    </View>
                    <View style={styles.modalButtons}>
                        <Button title="Choisir une image" onPress={pickImageAsync} />
                        <Button title="Prendre une photo" onPress={takePhotoAsync} />
                        <Button
                            title="Fermer"
                            onPress={() => setIsImageModalVisible(false)}
                        />
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f2f2f2",
    },
    profileContainer: {
        alignItems: "center",
        marginTop: 20,
    },
    avatarContainer: {
        position: "relative",
        marginBottom: 10,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    userName: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 5,
    },
    userStatus: {
        color: "#777",
    },
    optionsContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    option: {
        paddingVertical: 15,
        backgroundColor: "#fff",
        borderRadius: 8,
        marginBottom: 10,
    },
    optionText: {
        fontSize: 16,
        color: "#333",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    imagePreviewContainer: {
        width: "80%",
        height: "50%",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },
    imagePreview: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
    },
    cameraIcon: {
        position: "absolute",
        bottom: 10,
        right: 10,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        padding: 5,
        borderRadius: 50,
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "80%",
    },
});