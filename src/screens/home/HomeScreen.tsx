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
import { Text } from '@ui-kitten/components'
import Loading from '../../components/loading/Loading'
import { useCartStore } from '../../store/cart/useCart'

interface Props extends StackScreenProps<StackRootParams, 'HomeScreen'> { }

const HomeScreen = ({ navigation }: Props) => {
    const { user, status } = useAuthStore()
    const { getProducts } = useProductsStore();
    
    const { cart, getCart } = useCartStore();
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => await getProducts(),
        staleTime: 100 * 60 * 60
    });

    useEffect(() => {
        if (status === 'authenticated') {
            getCart();
            return
        };

    }, [cart.length, status])
    if (isLoading) return <Loading />;

    return (
        <>
            <ScrollView >
                <SearchBar />
                <ProductsInOffer
                    isLoading={isLoading}
                    products={data?.products!} />
                <Category />
                <About />
            </ScrollView>

        </>

    )

}
export default HomeScreen