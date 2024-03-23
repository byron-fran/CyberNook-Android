import { View, Text, ActivityIndicator } from 'react-native'

const Loading = () => {

    return (
        <View style={{flex : 1}}>
            <ActivityIndicator size={30}/>
        </View>

    )

}
export default Loading