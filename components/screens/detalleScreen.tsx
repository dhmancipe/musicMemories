import { View, Text, StyleSheet, Image } from "react-native";

import TextMemo from "../atoms/textMemo";

import playBar from "../../assets/barplay.png"
import star from "../../assets/estrella.png"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParams } from "../../routes/StackNavigator";
import { useEffect } from "react";
import ButtonMemo from "../atoms/buttonMemo";
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetalleScreen = () => {
    const navigation=useNavigation()

    const params = useRoute<RouteProp<RootStackParams, 'Detail'>>().params
    const addToStorage = async () => {
        try {
            
            const existingDataString = await AsyncStorage.getItem('mostListened');
            let existingData = existingDataString ? JSON.parse(existingDataString) : [];    
          
            if (!Array.isArray(existingData)) {
                existingData = [];
            }
                            const songExists = existingData.some((song: any) => song.name === params.name);            if (songExists) {
                console.log('La canción ya está en la lista.');
                return; 
            }    
            
            const MAX_SONGS = 10;
            if (existingData.length >= MAX_SONGS) {
                existingData.shift(); 
            }    
           
            existingData.push(params);            
            const updatedDataString = JSON.stringify(existingData);
            await AsyncStorage.setItem('mostListened', updatedDataString);
    
            console.log('Canción agregada correctamente.');
    
        } catch (error) {
            console.error('Error al agregar objeto a AsyncStorage:', error);
        }
    };
    

    useEffect(() => {
      navigation.setOptions({
        title:params?.name
      })
    }, [])
     
    
    
    return (<View style={styles.item}>
        <View style={styles.addFav}>
            
            <ButtonMemo onPress={()=>addToStorage()}>
            <TextMemo type="title">Fav </TextMemo>
                <Image
                    style={styles.imageButton}
                    source={star} 
                    resizeMode="contain"

                />
                </ButtonMemo>
        </View>
        <View>
            
                <Image
                    style={styles.image}
                    source={{ uri:params?.image  }} 
                    resizeMode="contain"

                />
            
        </View>

        <View style={styles.textContainer}>
            <TextMemo type="bigTitle">{params?.name}</TextMemo>
            <TextMemo type="parag">{params?.artist}</TextMemo>
           
        </View>
        
        <View style={styles.playContainer}>
                <Image
                    style={styles.play}
                    source={playBar}
                    resizeMode="contain"

                />

            </View>

    </View>)
}
    ;


export default DetalleScreen;

const styles = StyleSheet.create({
    item: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#17223f',
        padding: 3,
        marginVertical: 3,
       
        
        width:'100%'
    },
    image: {
        width: 300,
        height: 300,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop:60,
        marginBottom:50
    },
    imageButton: {
        width: 30,
        height: 30,
        
        alignSelf: 'center',
        
    },
    play: {
        width: 350,
        height: 85,
        alignSelf: 'center'
    },
    textContainer: {
        paddingLeft: 25,
        
    }, 
    playContainer: {
        flex: 1,
    justifyContent: 'center', // centra verticalmente
    alignItems: 'center',
    
    },
    addFav:{
        flexDirection: 'row', 
        justifyContent: 'flex-end', 
        marginRight: 30, 
        marginTop: 50,
    }
});