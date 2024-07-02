
import React, { useState } from 'react';
import { View, StyleSheet, Image, Pressable, Dimensions } from "react-native";
import { Track } from "../../api/repositories/apiMusic.types";
import TextMemo from "../atoms/textMemo";
import playIcon from "../../assets/play.png";



const Preview = ({ item, onPress }: { item: Track, onPress: (image: string, name: string, artist: string) => void }) => {

    const { width } = Dimensions.get('window');


    return (
        <Pressable style={[styles.item, { width: width - 20 }]} onPress={() => onPress(item?.image[0]['#text'] ?? '', item.name, item.artist.name)}>
            <View>
                {item.image.length > 0 &&
                    <Image
                        style={styles.image}
                        source={{ uri: item?.image[0]['#text'] }}
                        resizeMode="contain"
                    />
                }
            </View>

            <View style={styles.textContainer}>
                <TextMemo type="title">{item.name}</TextMemo>
                <TextMemo type="parag">{item.artist.name ?? item.artist}</TextMemo>
            </View>

            <View style={styles.playContainer}>
                <Image
                    style={styles.play}
                    source={playIcon}
                    resizeMode="contain"
                />
            </View>
        </Pressable>
    );
};

export default Preview;


const styles = StyleSheet.create({
    item: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#17223f',
        padding: 3,
        marginVertical: 3,

        marginLeft: 5,
        borderRadius: 15,
        borderWidth: 5,
        borderColor: '#172230',

    },
    image: {
        width: 75,
        height: 75,
        borderRadius: 10
    },
    play: {
        width: 25,
        height: 25,
        alignSelf: 'flex-end'
    },
    textContainer: {
        paddingLeft: 7,

    },
    playContainer: {
        position: 'absolute',
        right: 10,
        bottom: 10,
    },
});