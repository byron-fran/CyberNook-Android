import { View, StyleSheet, Pressable, DrawerLayoutAndroid, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StackRootParams } from '../../routes/Navigator'
import { Text, Input } from '@ui-kitten/components';
import { useAuthStore } from '../../store/useAuth';
import { StackNavigationProp } from '@react-navigation/stack';
import MenuItemsOverFlow from '../menu/MenuItems';
import { useProductsStore } from '../../store/useProducts';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Icon from 'react-native-vector-icons/Ionicons'
import { colors } from '../../colors/colors';


const SearchBar = () => {

    const { navigate } = useNavigation<StackNavigationProp<StackRootParams>>();
    const {getAllProducts} = useProductsStore()
    const { status } = useAuthStore();
    const [searchTerm, setSearchTerm] = useState('');

    const {data : all_products = [], isLoading} = useQuery({
        queryKey :[ 'all_products'],
        queryFn : async () => await getAllProducts(),
        staleTime : 100 * 60 * 60
    });

    const onCloseBTN = () => {
        setSearchTerm('')
    }
    return (
        <>
            <View style={styles.bgHeader}>
                <View style={styles.navBar}>
                    <Pressable onPress={() => navigate('HomeScreen')}><Text style={styles.title}>CyberNook</Text></Pressable>
                    {status === 'authenticated'
                        ?
                        <MenuItemsOverFlow />
                        :
                        <Pressable
                            onPress={() => navigate('LoginScreen')}
                        >
                            <Text style={styles.textLogin}>Login</Text>
                        </Pressable>
                    }
                </View>

                <Input
                    accessoryLeft={() => <Icon name='search-outline' size={25} color={colors.gray}/>}
                    style={styles.input}
                    placeholder='Search for anything'
                    placeholderTextColor={colors.gray}
                    accessoryRight={() =>  
                        <Icon 
                            onPress={onCloseBTN}
                            name='close-circle-outline' 
                            size={25} 
                            color={colors.gray}/>}
                    value={searchTerm}
                    onChangeText={(value) => setSearchTerm(value)}
                />

            </View>
        </>
    )

}

const styles = StyleSheet.create({
    input: {
        width: '90%',
        marginHorizontal: '5%',
        marginTop: 20
    },
    bgHeader: {
        width: '100%',
        backgroundColor: '#0854A5',
        height: 160,
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
    },
    navBar: {
        width: '90%',
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-between',
        marginHorizontal: '5%',
        alignItems: 'center'
    },
    title: {
        fontSize: 30,
        color: "white",
        fontWeight: 'bold'
    },
    textLogin: {
        fontSize: 17,
        color: 'white'
    }
})
export default SearchBar