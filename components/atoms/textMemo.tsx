import { StyleSheet, Text, View } from 'react-native';

interface MusicTextProps {
    type?: 'title'|'parag';
    children?: React.ReactNode;

}

const TextMemo=({type,children}:MusicTextProps)=>{
    return(<Text 
        style={ type== 'title'? styles.h2: styles.p}
        >{children}</Text>)

}

const styles = StyleSheet.create({
    h2: {  
      fontSize:18,
      color:'#fbfafe' ,
      fontWeight:'700',
      textAlign:'left'
    },
    p: {  
        fontSize:16,
        color:'#fbfafe'  ,
        textAlign:'left'
      },
  });

  export default TextMemo