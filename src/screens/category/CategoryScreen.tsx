import {  ScrollView } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { StackRootParams } from '../../routes/Navigator'
import SearchBar from '../../components/searchBar/SearchBar'
import { getProductsByCategory } from '../../config/adapters/getProductsByCategory'
import { useEffect, useState } from 'react'
import ProductCard from '../../components/category/ProductCard'
import { Product } from '../../interfaces/products'
import { Layout, Text } from '@ui-kitten/components'

interface Props extends StackScreenProps<StackRootParams, 'CategoryScreen'> { }

const CategoryScreen = ({ route: { params } }: Props) => {
    const [productsByCategory, setProductsByCategory] = useState<Product[]>([])
    const { category } = params;

    useEffect(() => {

        getProductsByCategory(category)
            .then((result: Product[]) => {
            setProductsByCategory(result)
            })
            .catch((error : unknown) => {
                throw new Error(error as string)
            })

    }, []);
   
    return (
        <ScrollView>
            <SearchBar />
            <Layout>
                { productsByCategory.length > 0 || productsByCategory !== undefined ? (
                    <Layout>
                        {productsByCategory.map(product => (
                            <ProductCard product={product} iconName='heart-outline' key={product.id}/>
                        ))}
                    </Layout>
                ) : <Layout>
                        <Text>Cargando...</Text>
                    </Layout>}
            </Layout>
        </ScrollView>

    )

}
export default CategoryScreen