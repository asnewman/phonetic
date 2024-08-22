import React, { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { TextInput, View, StyleSheet, Button } from 'react-native';

interface SentenceProps {
    english: string;
    hebrew: string;
    phonetic: string;
}

const Sentence: React.FC = () => {
    const route = useRoute();
    const { english, hebrew, phonetic } = route.params as SentenceProps;

    const [englishValue, setEnglishValue] = useState(english);
    const [hebrewValue, setHebrewValue] = useState(hebrew);
    const [phoneticValue, setPhoneticValue] = useState(phonetic);

    const handleSave = () => {
        // Add your save logic here
        console.log("Save button clicked");
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={englishValue}
                onChangeText={setEnglishValue}
            />
            <TextInput
                style={styles.input}
                value={hebrewValue}
                onChangeText={setHebrewValue}
            />
            <TextInput
                style={styles.input}
                value={phoneticValue}
                onChangeText={setPhoneticValue}
            />
            <View style={{ width: '80%' }}>
                <Button title="Save" onPress={handleSave} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1,
        alignItems: 'center',
    },
    input: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});

export default Sentence;