import { addSentenceAtom } from '@/store';
import { router } from 'expo-router';
import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { TextInput, View, StyleSheet, Button } from 'react-native';

async function mockRequest(): Promise<{ english: string, hebrew: string, phonetic: string }> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                english: "I am eating ice cream",
                hebrew: "אני אוכל גלידה",
                phonetic: "Ani ochel glida",
              });
        }, 1000);
    });
}

const Create: React.FC = () => {
    const [englishValue, setEnglishValue] = useState('');
    const [hebrewValue, setHebrewValue] = useState('');
    const [phoneticValue, setPhoneticValue] = useState('');
    const [autoPopulateEnabled, setAutoPopulateEnabled] = useState(false);
    const [isLoadingAutoPopulate, setIsLoadingAutoPopulate] = useState(false);
    const [saveButtonEnabled, setSaveButtonEnabled] = useState(false);
    const [, addSentence] = useAtom(addSentenceAtom);

    const handleEnglishChange = (text: string) => {
        setEnglishValue(text);
        setAutoPopulateEnabled(text !== '');
        setSaveButtonEnabled(text !== '');
    };

    const handleAutoPopulate = async () => {
        setAutoPopulateEnabled(false); // Disable all buttons
        setIsLoadingAutoPopulate(true);
        setSaveButtonEnabled(false);
        // Show loading indicator

        try {
            const result = await mockRequest();

            setHebrewValue(result.hebrew);
            setPhoneticValue(result.phonetic);
        } catch (error) {
            // Handle error
        } finally {
            setAutoPopulateEnabled(true); // Enable all buttons
            setSaveButtonEnabled(true);
            setIsLoadingAutoPopulate(false);
            // Hide loading indicator
        }
    };

    const handleSave = () => {
        addSentence({ english: englishValue, hebrew: hebrewValue, phonetic: phoneticValue });
        router.back();
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={englishValue}
                onChangeText={handleEnglishChange}
                placeholder='English'
            />
            <TextInput
                style={styles.input}
                value={hebrewValue}
                onChangeText={setHebrewValue}
                placeholder='Hebrew'
            />
            <TextInput
                style={styles.input}
                value={phoneticValue}
                onChangeText={setPhoneticValue}
                placeholder='Phonetic'
            />
            <View style={{ width: '80%', marginBottom: 10 }}>
                <Button title={isLoadingAutoPopulate ? "Loading..." : "Auto Populate"} onPress={handleAutoPopulate} disabled={!autoPopulateEnabled} color="purple" />
            </View>
            <View style={{ width: '80%' }}>
                <Button title="Save" onPress={handleSave} disabled={!saveButtonEnabled} />
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

export default Create;