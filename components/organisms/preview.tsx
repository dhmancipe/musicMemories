import { View, Text, StyleSheet, Image } from "react-native";
import { Track } from "../../api/repositories/apiMusic.types";
import TextMemo from "../atoms/textMemo";
import playIcon from "../../assets/play.png"

const Preview = ({ item }: { item: Track }) => {
    //console.log(item.image[0]['#text'])
    return (<View style={styles.item}>
        <View>
            {item.image.length > 0 &&
                <Image
                    style={styles.image}
                    source={{ uri: item.image[3]['#text'] }} // Utiliza la URL de la imagen en el tamaño deseado
                    resizeMode="contain"

                />
            }
        </View>

        <View style={styles.textContainer}>
            <TextMemo type="title">{item.name}</TextMemo>
            <TextMemo type="parag">{item.artist.name}</TextMemo>
           
        </View>
        <View style={styles.playContainer}>
                <Image
                    style={styles.play}
                    source={playIcon}
                    resizeMode="contain"

                />

            </View>

    </View>)
}
    ;


export default Preview;

const styles = StyleSheet.create({
    item: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#17223f',
        padding: 3,
        marginVertical: 3,
        marginRight: 10,
        marginLeft:5,
        borderRadius: 15,
        borderWidth: 5,
        borderColor: '#172230',
        width:'100%'
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
        position: 'absolute', // Posiciona el contenedor de la imagen de play de forma absoluta
        right: 10, // A 10 píxeles del borde derecho
        bottom: 10, // Alinea la imagen al fondo
    },
});