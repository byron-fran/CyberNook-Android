import { View, Text, StyleSheet, Pressable } from 'react-native'

const SearchBar = () => {

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
                <Pressable><Text style={{ fontSize : 17, color : 'white'}}>Hello, Byron</Text></Pressable>
            </View>
        </View>

    )

}

const styles = StyleSheet.create({

})
export default SearchBar