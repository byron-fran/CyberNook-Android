import { View, Text } from 'react-native'
import SearchBar from '../../components/searchBar/SearchBar'

const HomeScreen = () => {

    return (
        <View style={{ flex : 1}}>
            <SearchBar/>
            <Text>HomeScreen</Text>
        </View>

    )

}
export default HomeScreen