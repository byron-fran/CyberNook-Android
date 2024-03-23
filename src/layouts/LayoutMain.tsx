import { PropsWithChildren } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'

const LayoutMain = ({ children }: PropsWithChildren) => {

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>CyberNook</Text>
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