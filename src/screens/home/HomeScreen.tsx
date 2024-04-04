import { ScrollView, StyleSheet, View } from 'react-native'
import { StackRootParams } from '../../routes/Navigator'
import { StackScreenProps } from '@react-navigation/stack'
import SearchBar from '../../components/searchBar/SearchBar'
import { useProductsStore } from '../../store/useProducts'
import { useEffect, useRef } from 'react'
import About from '../../components/about/About'
import ProductsInOffer from '../../components/products/ProductsInOffer'
import Category from '../../components/category/Category'
import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from '../../store/useAuth'
import Loading from '../../components/loading/Loading'
import { useCartStore } from '../../store/cart/useCart'
import Navbar from '../../components/nav/NavBar'

interface Props extends StackScreenProps<StackRootParams, 'HomeScreen'> { }

const HomeScreen = ({ navigation }: Props) => {
    const {  status } = useAuthStore()
    const { isLoading } = useProductsStore();
    const { cart, getCart } = useCartStore();

    useEffect(() => {
        if (status === 'authenticated') {
            getCart();
            return
        };

    }, [cart.length, status]);

    if (isLoading) return <Loading />;
 

    return (
        <>
            <ScrollView style={{ backgroundColor : '#fff'}} >
                <SearchBar />
                <Navbar/>
                <ProductsInOffer
                    isLoading={isLoading} />
                <Category />
                <About />
            </ScrollView>

        </>

    )

}
export default HomeScreen