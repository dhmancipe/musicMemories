import { FlatList, Text, View, StyleSheet, SafeAreaView } from "react-native";
import React, { useEffect, useState } from 'react';
import TextMemo from "../atoms/textMemo";

import { TopTracksResponse, Track, TrackPreview, Tracks } from "../../api/repositories/apiMusic.types";
import Preview from "../organisms/preview";

import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = () => {

  const [dataStorage, setDataStorage] = useState<Track[] | null>(null);


  const mapTrackPreviewToTrack = (trackPreview: TrackPreview): Track => {
    const track: Track = {
      name: trackPreview.name,
      duration: '',
      listeners: '',
      mbid: '',
      url: '',
      streamable: { "#text": "0", fulltrack: "0" },
      artist: trackPreview.artist,
      image: [{ "#text": trackPreview.image, size: '' }]
    };
    return track;
  };
  const mapTrackPreviewsToTracks = (dataStorage: TrackPreview[]): Tracks => {
    const tracks: Tracks = {
      track: dataStorage.map(trackPreview => mapTrackPreviewToTrack(trackPreview))
    };
    return tracks;
  };
  const getMostListened = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('mostListened');
      let mostListenedObject = jsonValue ? JSON.parse(jsonValue) : [];

      const tracks2 = mapTrackPreviewsToTracks(mostListenedObject ?? [])
      const topTracksResponse: TopTracksResponse = {
        tracks: tracks2 ?? [],
        "@attr": { country: '', page: '', perPage: '', totalPages: '', total: '' }
      };
      const tracks3 = topTracksResponse?.tracks.track
      const reversedTracks = tracks3.reverse();
      setDataStorage(reversedTracks);


      return jsonValue;
    } catch (e) {
      console.log('Error rn async-Storage Profile:', e)
    }
  };




  useEffect(() => {

    getMostListened()

  }, [])


  const handlePreviewPress = () => {
    console.log('esta es una de tus preferidas')
  };
  const renderItem = ({ item }: { item: Track }) => (
    <Preview item={item} onPress={handlePreviewPress} />
  );
  return (<SafeAreaView style={styles.container}>
    <View style={styles.header}>
      <View style={{ paddingRight: 50 }}>
        <TextMemo type="bigTitle">Profile</TextMemo>
        <TextMemo type="parag">My favorite songs</TextMemo>
      </View>

    </View>
    <FlatList
      data={dataStorage ?? []}
      renderItem={renderItem}
      keyExtractor={(item, index) => `${item.name}-${index}`} // Usar una clave única para cada elemento
    />

  </SafeAreaView>)
}
export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#17223f',
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    flexDirection: 'row',
    justifyContent: "flex-start",
    padding: 10
  }
});