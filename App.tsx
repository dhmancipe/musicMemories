
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './components/screens/HomeScreen';
import TextMemo from './components/atoms/textMemo';

export default function App() {
  return (
    <View style={styles.container}>
       
      
      <HomeScreen></HomeScreen>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#17223f',
    alignItems: 'center',
    justifyContent: 'center',
    color:'#fbfafe',
    paddingRight:2,

  },
});
