import { FlatList, View,  StyleSheet, SafeAreaView } from "react-native";
import React, { useEffect, useState } from 'react';
import TextMemo from "../atoms/textMemo";
import PublicClient from "../../api/clients/publicClient";
import {  Track } from "../../api/repositories/apiMusic.types";
import Preview from "../organisms/preview";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { type RootStackParams } from "../../routes/StackNavigator";
import ButtonMemo from "../atoms/buttonMemo";




const HomeScreen = () => {
  const [tracks, setTracks] = useState<Track[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const handlePreviewPress = (image: string, name: string, artist: string) => {
    navigation.navigate('Detail', { name, image, artist })
  };

  const country = 'Colombia'

  useEffect(() => {
    PublicClient.get('/', {
      params: {
        method: 'chart.getTopTracks',
        country: country
      }
    })
      .then(response => {

        setTracks(response.data.tracks.track)
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [country]);

  
  const renderItem = ({ item }: { item: Track }) => (
    <Preview item={item} onPress={handlePreviewPress} />
  );
  return (<SafeAreaView style={styles.container}>
    <View style={styles.header}>
      <View style={{ paddingRight: 50 }}>
        <TextMemo type="bigTitle">Music Memories</TextMemo>
        <TextMemo type="parag">Most listened</TextMemo>
      </View>
      <ButtonMemo onPress={() => navigation.navigate('Profile')}>
        <TextMemo type="title">Profile  </TextMemo>

      </ButtonMemo>
    </View>

    {loading &&
      <TextMemo type="title">Loading...  </TextMemo>
    }

    {error &&
      <TextMemo type="title">Sorry we have some errors: {error}  </TextMemo>
    }

    <FlatList
      data={tracks}
      renderItem={renderItem}
      keyExtractor={(item, index) => `${item.name}-${index}`} // Usar una clave única para cada elemento
    />

  </SafeAreaView>)
}
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#17223f',
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    flexDirection: 'row',
    justifyContent: "space-evenly",
    padding: 10
  }
});