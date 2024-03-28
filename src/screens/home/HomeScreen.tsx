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

interface Props extends StackScreenProps<StackRootParams, 'HomeScreen'> { }

const HomeScreen = ({ navigation }: Props) => {
    const { user, status } = useAuthStore()
    const { getProducts } = useProductsStore();

    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => await getProducts(),
        staleTime: 100 * 60 * 60
    })

    return (
        <>
            <ScrollView >
                <SearchBar />
                <ProductsInOffer products={products} />
                <Category />
                <About />
            </ScrollView>

        </>

    )

}
export default HomeScreen