import { View, Text, Pressable } from 'react-native'
import { StackRootParams } from '../../routes/Navigator'
import { StackScreenProps } from '@react-navigation/stack'


interface Props extends  StackScreenProps<StackRootParams, 'HomeScreen'>{} 

const HomeScreen = ({navigation} : Props) => {

    return (
        <View>
            <Text>Home</Text>
            <Pressable onPress={() => navigation.navigate('LoginScreen')} style={{ backgroundColor : 'blue'}}>
                <Text style={{ color : 'white'}}>Login</Text>
            </Pressable>
        </View>

    )

}
export default HomeScreen