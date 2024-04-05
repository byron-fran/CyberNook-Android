import { View, Text, ScrollView, StyleSheet } from 'react-native'
import SearchBar from '../../components/searchBar/SearchBar'
import { useProductsStore } from '../../store/useProducts'
import Navbar from '../../components/nav/NavBar'
import ProductCard from '../../components/category/ProductCard'
import { useEffect, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack'
import { StackRootParams } from '../../routes/Navigator'
import Loading from '../../components/loading/Loading'

interface Props extends StackScreenProps<StackRootParams, 'ProductsScreen'> { }

const ProductsScreen = ({ route: { params } }: Props) => {
    const [isLoading, setIsLoading] = useState(false)
    const { category, mark, page } = params;
    const { getProducts, products, clearProducts } = useProductsStore()

    const [isFavorite, setIsFavorite] = useState(false);


    useEffect(() => {
        if (category || mark) {
            setIsLoading(true)
            getProducts(1, category, mark).then(() => { setIsLoading(false) })
        }

    }, [category, mark]);


    useEffect(() => {
        return () => {
            clearProducts()
        }
    }, [])

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
            <SearchBar />
            <Navbar />
            <View style={{ flex: 1, height: '100%' }}>
                {isLoading ? <Loading  heightContainer={400}/> : (
                    <>
                        {products.length > 0 ? products.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                iconName='heart-outline'
                                isFavorite={false}
                                setIsFavorite={setIsFavorite}
                            />
                        )) : <View style={styles.conatinerNoResult}>
                                <Text style={styles.textNoResult}>Nothing was found</Text>
                            </View>}
                    </>

                )}

            </View>
        </ScrollView>

    )

};
const styles = StyleSheet.create({
    conatinerNoResult: {
        height: 400,
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    textNoResult  : {
        fontWeight : 'bold',
        color : '#000',
        fontSize : 30
    }
})
export default ProductsScreen