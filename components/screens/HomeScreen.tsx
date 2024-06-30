import { FlatList, Text, View, Image } from "react-native";
import React, { useEffect, useState } from 'react';
import TextMemo from "../atoms/textMemo";
import PublicClient from "../../api/clients/publicClient";
import { TopTracksResponse } from "../../api/repositories/apiMusic.types";
import Preview from "../organisms/preview";

const HomeScreen = () => {
  const [data, setData] = useState<TopTracksResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    PublicClient.get('/', {
      params: {
        method: 'chart.getTopTracks',

      }
    })
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  // console.log('data-->>', data?.tracks.track, 'loading', loading, 'error', error)

  const tracks = data?.tracks.track
  return (<View>
    <TextMemo type="parag">Home Screen Paragraph</TextMemo>
    <TextMemo type="title">Home Screen Title</TextMemo>


    <FlatList
      data={tracks}
      renderItem={Preview}
      keyExtractor={(item, index) => `${item.name}-${index}`} // Usar una clave única para cada elemento
    />

  </View>)
}
export default HomeScreen;