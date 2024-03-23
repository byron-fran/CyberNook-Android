import { View, Text, Pressable ,ScrollView} from 'react-native'
import { StackRootParams } from '../../routes/Navigator'
import { StackScreenProps } from '@react-navigation/stack'
import SearchBar from '../../components/searchBar/SearchBar'
import { useProductsStore } from '../../store/useProducts'
import { useEffect } from 'react'
import { Product } from '../../interfaces/products'
import ProductGreatestOffer from '../../components/products/ProductsInOffer'

interface Props extends  StackScreenProps<StackRootParams, 'HomeScreen'>{} 

const HomeScreen = ({navigation} : Props) => {
    const {products, getProducts, isLoading} = useProductsStore();

    useEffect(() => {
        getProducts()
    }, []);


    return (
        <ScrollView>
            <SearchBar/>
            <ProductGreatestOffer products={products}/>
        </ScrollView>

    )

}
export default HomeScreen