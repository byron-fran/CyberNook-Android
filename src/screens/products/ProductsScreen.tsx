import { View, Text, ScrollView } from 'react-native'
import SearchBar from '../../components/searchBar/SearchBar'
import { useProductsStore } from '../../store/useProducts'
import Navbar from '../../components/nav/NavBar'
import ProductCard from '../../components/category/ProductCard'
import { useEffect, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack'
import { StackRootParams } from '../../routes/Navigator'
import { cybernookApi } from '../../config/api/cybernookApi'
import { ProductsResponse } from '../../store/useProducts'
import { Product } from '../../interfaces/products'

interface Props extends StackScreenProps<StackRootParams, 'ProductsScreen'> { }

const ProductsScreen = ({ route: { params } }: Props) => {
    const { category, mark, page } = params;
    const { getProducts, products, isLoading } = useProductsStore()

    const [isFavorite, setIsFavorite] = useState(false);


    useEffect(() => {
        if(category || mark){
            getProducts(1, category, mark)
        }
    }, [category, mark]);
    if(isLoading) return <View><Text>cargando</Text></View>
    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
            <SearchBar />
            <Navbar />
            <View style={{ flex: 1, height: '100%' }}>
                {products.length > 0 ? products.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        iconName='heart-outline'
                        isFavorite={false}
                        setIsFavorite={setIsFavorite}
                    />
                )) : <View><Text>No hay nada</Text></View>}
            </View>
        </ScrollView>

    )

}
export default ProductsScreen