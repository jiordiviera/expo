import {Image, StyleSheet, Platform, Button, Animated, Text, View} from 'react-native';


import DateTimePicker, {DateTimePickerEvent} from '@react-native-community/datetimepicker';
import {useState} from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import ParallaxScrollView from "@/components/ParallaxScrollView";

export default function HomeScreen() {
    const [date, setDate] = useState<Date>(new Date());
    const [showPicker, setShowPicker] = useState<boolean>(false);
    const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        setShowPicker(false);
        setDate(currentDate);
    }
    // const user = auth().currentUser
    return (<ParallaxScrollView
            headerBackgroundColor={{light: '#D0D0D0', dark: '#353636'}}
            headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage}/>}>
            <View>
                <Button title="Make date now" onPress={() => setShowPicker(true)}/>
                {showPicker && (
                    <DateTimePicker mode="date" value={date} display="default" onChange={handleDateChange}/>
                )
                }

            </View>
            <View>
                <Text>Selected
                    Date: {date.toDateString()}</Text>
            </View>

        </ParallaxScrollView>

    );

}
const styles = StyleSheet.create({
    headerImage: {
        color: '#808080',
        bottom: -90,
        left: -35,
        position: 'absolute',
    },
    titleContainer: {
        flexDirection: 'row',
        gap: 8,
    },
});