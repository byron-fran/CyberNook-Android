import { View, Text, StyleSheet, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StackRootParams } from '../../routes/Navigator'
import { Input } from '@ui-kitten/components';

const SearchBar = () => {

    const navigation = useNavigation();

    return (
        <View style={{
            width : '100%',
            backgroundColor : '#0854A5',
            height : 165,
            borderBottomEndRadius : 20,
            borderBottomStartRadius : 20,

        }}>
            <View style={{width : '90%',flexDirection : 'row', marginTop : 10, justifyContent :  'space-between', marginHorizontal : '5%', alignItems :  'center'}}>
                <Pressable><Text style={{ fontSize : 30, color : "white", fontWeight : 'bold'}}>CyberNook</Text></Pressable>
                <Pressable onPress={() => navigation.navigate('LoginScreen' as never)}><Text style={{ fontSize : 17, color : 'white'}}>Hello, Byron</Text></Pressable>
            </View>
            <View>
                <Input
                    style={styles.input}
                    placeholder='Search for anything'
                />
            </View>
        </View>

    )

}

const styles = StyleSheet.create({
    input : {
        width : '90%',
        marginHorizontal : '5%',
        marginTop : 20
    }
})
export default SearchBar