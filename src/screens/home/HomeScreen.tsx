import { ScrollView, StyleSheet, View } from 'react-native'
import { StackRootParams } from '../../routes/Navigator'
import { StackScreenProps } from '@react-navigation/stack'
import SearchBar from '../../components/searchBar/SearchBar'
import { useProductsStore } from '../../store/products/useProducts'
import { useEffect, useRef } from 'react'
import About from '../../components/about/About'
import ProductsInOffer from '../../components/products/ProductsInOffer'
import Category from '../../components/category/Category'
import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from '../../store/auth/useAuth'
import Loading from '../../components/loading/Loading'
import { useCartStore } from '../../store/cart/useCart'
import Navbar from '../../components/nav/NavBar'
import { Text } from 'react-native-svg'

interface Props extends StackScreenProps<StackRootParams, 'HomeScreen'> { }

const HomeScreen = ({ navigation }: Props) => {
    const {  status } = useAuthStore()
    const { getAllProducts} = useProductsStore();
    const { cart, getCart } = useCartStore();


    useEffect(() => {
        if (status === 'authenticated') {
            getCart();
            return
        };

    }, [cart.length, status]);

    const { data: allProducts = [], isLoading } = useQuery({
        queryKey: ['all_products'],
        queryFn: async () => await getAllProducts(),
        staleTime: 100 * 60 * 60
    });

 
    return (
        <>
            <ScrollView style={{ backgroundColor : '#fff'}} >
                <Text>Hola</Text>
                <SearchBar />
                <Navbar/>
                <ProductsInOffer
                    allProducts={allProducts}
                    isLoading={isLoading} />
                <Category />
                <About />
            </ScrollView>

        </>

    )

}
export default HomeScreen