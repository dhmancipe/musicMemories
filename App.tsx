
import 'react-native-gesture-handler';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import HomeScreen from './components/screens/HomeScreen';
import TextMemo from './components/atoms/textMemo';
import DetalleScreen from './components/screens/detalleScreen';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './routes/StackNavigator';

export default function App() {
  return (
    <NavigationContainer >
       
       <StackNavigator/>
      
      
    </NavigationContainer>
  );
}


