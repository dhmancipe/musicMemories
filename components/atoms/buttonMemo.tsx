import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

interface MusicButtonProps {
    children?: React.ReactNode;
    onPress?: () => void;
}

const ButtonMemo = ({ onPress, children }: MusicButtonProps) => {
    return (
        <Pressable onPress={onPress}>
            {({ pressed }) => (
                <View style={[styles.btnContainer, pressed && styles.btnContainerPressed]}>
                    <View style={styles.btn}>
                        {children}
                    </View>
                </View>
            )}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    btnContainer: {
        borderRadius: 8,
        elevation: 5, 
        
        width: 100,
    },
    btnContainerPressed: {
        backgroundColor: '#000324', 
        },
    btn: {
        flexDirection:'row',
        padding: 15,
        backgroundColor: '#6D0FF2',
        width: 110,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default ButtonMemo;
