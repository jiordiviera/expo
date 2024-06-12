import {Image, ImageSourcePropType, StyleSheet} from 'react-native';

export default function ImageViewer({placeholderImageSource, selectedImage}: {
    placeholderImageSource: ImageSourcePropType;
    selectedImage: string | null;
}) {
    const imageSource = selectedImage ? {uri: selectedImage} : placeholderImageSource;

    // @ts-ignore
    return <Image source={imageSource} style={styles.image}/>;
}
const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
    },
})