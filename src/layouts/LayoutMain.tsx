import { PropsWithChildren } from 'react'
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'


const LayoutMain = ({ children } : PropsWithChildren) => {

    const  navigate= useNavigation()

    return (
        <ScrollView>
            <View style={styles.container}>
                <Pressable onPress={() => navigate.navigate('HomeScreen' as never)} >
                    <Text style={styles.title}>CyberNook</Text>
                </Pressable>
                <View style={styles.main}>
                    {children}
                </View>
            </View>
        </ScrollView>
    )

}

const styles = StyleSheet.create({
    
    container: {
        backgroundColor: '#0854A5',
        flex: 1,
        paddingBottom: 10

    },

    title: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 35,
        fontWeight: 'bold',
        paddingVertical: 40
    },
    main: {
        backgroundColor: '#fff',
        height: '100%',
        borderTopEndRadius: 30,
        borderTopStartRadius: 30,


    }
})
export default LayoutMain