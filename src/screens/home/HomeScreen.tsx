import { View, Text, Pressable ,ScrollView} from 'react-native'
import { StackRootParams } from '../../routes/Navigator'
import { StackScreenProps } from '@react-navigation/stack'
import SearchBar from '../../components/searchBar/SearchBar'
import { useProductsStore } from '../../store/useProducts'
import { useEffect } from 'react'
import About from '../../components/about/About'
import ProductsInOffer from '../../components/products/ProductsInOffer'
import Category from '../../components/category/Category'

interface Props extends  StackScreenProps<StackRootParams, 'HomeScreen'>{} 

const HomeScreen = ({navigation} : Props) => {
    const {products, getProducts, isLoading} = useProductsStore();

    useEffect(() => {
        getProducts()
    }, []);


    return (
        <>
        <ScrollView >
            <SearchBar/>
            <ProductsInOffer products={products}/>
            <Category/>
            <About/>
        </ScrollView>
        
        </>

    )

}
export default HomeScreen