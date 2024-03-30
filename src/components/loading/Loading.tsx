import { View, Text, ActivityIndicator, DimensionValue } from 'react-native'

interface Props {
    heightContainer?:DimensionValue
}
const Loading = ({heightContainer ='100%'} : Props) => {

    return (
        <View style={{flex : 1, justifyContent : 'center',alignItems : 'center' , height :heightContainer}}>
            <ActivityIndicator size={30}/>
        </View>

    )

}
export default Loading