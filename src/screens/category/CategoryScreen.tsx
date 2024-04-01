import { ScrollView } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { StackRootParams } from '../../routes/Navigator'
import SearchBar from '../../components/searchBar/SearchBar'
import { getProductsByCategory } from '../../config/adapters/getProductsByCategory'
import { useEffect, useState } from 'react'
import ProductCard from '../../components/category/ProductCard'
import { Product } from '../../interfaces/products'
import { Layout, Text } from '@ui-kitten/components'
import useToastAnimation from '../../hooks/animations/useToast'
import { useCartStore } from '../../store/cart/useCart'

interface Props extends StackScreenProps<StackRootParams, 'CategoryScreen'> { }

const CategoryScreen = ({ route: { params } }: Props) => {
    const { success } = useCartStore();
    const [isFavorite, setIsFavorite] = useState<boolean>(false)
    const { CustomToast, showToast } = useToastAnimation(
        {
            type: 'success',
            text1: 'Add to cart success',
            iconName: 'cart-outline',
            colorText: '#F97316',
            borderColor: '#F97316'
        }
    )
    const [productsByCategory, setProductsByCategory] = useState<Product[]>([])
    const { category } = params;

    useEffect(() => {

        getProductsByCategory(category)
            .then((result: Product[]) => {

                setProductsByCategory(result);

            })

    }, []);

    useEffect(() => {
        if (success) {
            showToast()
        }
    }, [showToast, success]);



    
    return (
        <>
            <CustomToast />
            <ScrollView>
                <SearchBar />
                <Layout>
                    {productsByCategory.length > 0 || productsByCategory !== undefined ? (
                        <Layout>
                            {productsByCategory.map(product => (
                                <ProductCard
                                    setIsFavorite={setIsFavorite}
                                    isFavorite={isFavorite}
                   
                                    product={product}
                                    iconName={`${isFavorite ? 'heart' : 'heart-outline'}`}
                                    key={product.id} />
                            ))}
                        </Layout>
                    ) : <Layout>
                        <Text>Cargando...</Text>
                    </Layout>}
                </Layout>
            </ScrollView>
        </>

    )

}
export default CategoryScreen