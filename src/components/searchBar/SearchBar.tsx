import { useEffect, useState } from 'react';
import { View, StyleSheet, Pressable, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StackRootParams } from '../../routes/Navigator'
import { Text, Input, Select, SelectItem } from '@ui-kitten/components';
import { useAuthStore } from '../../store/auth/useAuth';
import { StackNavigationProp } from '@react-navigation/stack';
import MenuItemsOverFlow from '../menu/MenuItems';
import { useProductsStore } from '../../store/products/useProducts';
import Icon from 'react-native-vector-icons/Ionicons'
import { colors } from '../../colors/colors';
import ListSearch from './ListSearch';

const SearchBar = () => {

    const { navigate } = useNavigation<StackNavigationProp<StackRootParams>>();
    const { getProducts, allProducts } = useProductsStore()
    const { status } = useAuthStore();
    const [searchTerm, setSearchTerm] = useState('');

    const onCloseBTN = () => {
        setSearchTerm('')
    };

    // filter products by name
    const productsFilterByName = allProducts.filter(product => {
        if (searchTerm.trim().length >= 1) {
            return product.name.toLowerCase().includes(searchTerm.trim().toLowerCase());
        }
    });

    // limit search results to 10
    const productsFilterByNameLimit = productsFilterByName.slice(0, 10);

    // filter products by category
    const productsFilterByCategory = allProducts.filter(product => {
        if (searchTerm.trim().length >= 1) {
            return product.category.toLowerCase().includes(searchTerm.trim());
        }
    });

    // limit search results to 10
    const productsFilterByCategoryLimit = productsFilterByCategory.slice(0, 10);


    // filter products by mark
    const producstFilterByMark = allProducts.filter(product => {
        if (searchTerm.trim().length >= 1) {

            return product.mark?.toLowerCase().includes(searchTerm.trim())
        }
    })

    // limit search results to 10
    const producstFilterByMarkLimit = producstFilterByMark.slice(0, 10);

    return (
        <>
            <View style={styles.bgHeader}>
                <View style={styles.navBar}>
                    <Pressable onPress={() => {
                        navigate('HomeScreen')
                        getProducts()
                    }}><Text style={styles.title}>CyberNook</Text></Pressable>
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
                    accessoryLeft={() =>
                        <Icon name='search-outline'
                            size={25}
                            color={colors.gray}
                        />}
                    style={[styles.input, { position: 'absolute', top: 32 }]}
                    placeholder='Search for anything'
                    placeholderTextColor={colors.gray}
                    accessoryRight={() =>
                        <Icon
                            onPress={onCloseBTN}
                            name='close-circle-outline'
                            size={25}
                            color={colors.gray}
                        />}
                    value={searchTerm}
                    onChangeText={(value) => setSearchTerm(value)}
                />

            </View>
            {/* Section list Searh */}
            <ListSearch
                producstFilterByMark={producstFilterByMark}
                producstFilterByMarkLimit={producstFilterByMarkLimit}
                productsFilterByCategory={productsFilterByCategory}
                productsFilterByCategoryLimit={productsFilterByCategoryLimit}
                productsFilterByName={productsFilterByName}
                productsFilterByNameLimit={productsFilterByNameLimit}
                setSearchTerm={setSearchTerm}

            />
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
    },

})
export default SearchBar