import { View, Text, StyleSheet, Image } from "react-native";
import { Track } from "../../api/repositories/apiMusic.types";
import TextMemo from "../atoms/textMemo";
import playIcon from "../../assets/play.png"
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
            // Obtener datos actuales de AsyncStorage
            const existingDataString = await AsyncStorage.getItem('mostListened');
            let existingData = existingDataString ? JSON.parse(existingDataString) : [];
    
            // Verificar si existingData es un array válido, si no, inicializar como un array vacío
            if (!Array.isArray(existingData)) {
                existingData = [];
            }
    
            // Verificar si la canción ya está en la lista por algún identificador único
            const songExists = existingData.some((song: any) => song.name === params.name); // Aquí debes ajustar la condición según la estructura de tus datos
    
            if (songExists) {
                console.log('La canción ya está en la lista.');
                return; // No hacer nada más si la canción ya está en la lista
            }
    
            // Si ya hay 10 canciones, eliminar la primera para hacer espacio
            const MAX_SONGS = 10;
            if (existingData.length >= MAX_SONGS) {
                existingData.shift(); // Eliminar la primera canción del arreglo
            }
    
            // Agregar la nueva canción al final del arreglo
            existingData.push(params);
    
            // Convertir a JSON y guardar en AsyncStorage
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