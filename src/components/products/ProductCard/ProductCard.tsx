import { Product } from '../../../interfaces/products'
import { FC, useEffect, useState } from 'react'
import { Text } from '@ui-kitten/components'
import { ActivityIndicator, Image, Pressable, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { formatQuantity } from '../../../helpers/formatQuanity'
import { StackRootParams } from '../../../routes/Navigator'
import { StackNavigationProp } from '@react-navigation/stack'
import { useCartStore } from '../../../store/cart/useCart'
import { useAuthStore } from '../../../store/auth/useAuth'
import { useNavigation } from '@react-navigation/native'
import { createOrder } from '../../../utilities/createOrder'
import { useFavoriteStore } from '../../../store/favorites/useFavoriteStore'
import { cybernookApi } from '../../../config/api/cybernookApi'
import { colors } from '../../../colors/colors'
import { ProdcutCardStyles as styles } from './ProductCard.styles'

interface Props {

    product: Product
};
const ProductCard: FC<Props> = ({ product }) => {

    const [isFav, setIsFav] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isLoadingFavorite, setIsLoadingFavorite] = useState<boolean>(false)

    const { updateOrderById, addToCart, cart } = useCartStore();
    const { removeFavorite, addFavorite } = useFavoriteStore();
    const { status, } = useAuthStore();

    const { navigate } = useNavigation<StackNavigationProp<StackRootParams>>();

    const hadleAddToCart = async (id: string): Promise<void> => {

        const order = createOrder(product, 1, id);
        const orderFind = cart.find(order => order.ProductId === id);

        if (orderFind) {
            setIsLoading(true)
            await updateOrderById(orderFind.id!, order)
            setIsLoading(false);
            return
        }

        setIsLoading(true)
        await addToCart(order)
        setIsLoading(false)

    };

    useEffect(() => {
        const chekingIsFavorite = async () => {
            try {

                setIsLoadingFavorite(true)
                const { data } = await cybernookApi.post(`/check-favorite/${product.id}`)
                setIsFav(data)
                setIsLoadingFavorite(false)

            } catch (error) {
                console.log("errror", error)
            }
        }
        chekingIsFavorite();

    }, []);

    return (
        <>
            <View style={styles.card}>
                <Pressable
                    onPress={() => navigate('ProductDetail', { id: product.id! })}
                    style={{ flex: 1 }}>
                    {/* Image of product  */}
                    <Image

                        style={styles.image}
                        source={{ uri: product.image !== null ? product.image : 'https://m.media-amazon.com/images/I/51bryY47IFL._SL1080_.jpg' }}
                    />
                </Pressable>
                <View style={styles.sectionInfo}>
                    <Text
                        numberOfLines={1}
                        style={styles.textProduct}>
                        {product.name}
                    </Text>
                    {/* Section Prices */}
                    <View style={styles.sectionAllPrices}>
                        {product.discount > 0 && (
                            <Text style={styles.textPriceOffer}>{formatQuantity(product.price - (product.price * (product.discount / 100)))}</Text>
                        )}
                        <View style={styles.sectionPrices}>
                            {product.discount > 0 && (
                                <Text>On offer</Text>
                            )}
                            <Text style={styles.textPrice}>{formatQuantity(product.price)}</Text>
                        </View>
                    </View>
                    {/* Section Shippjng */}
                    <View style={styles.sectionShipping}>
                        <Image
                            style={styles.imgShipping}
                            source={require('../../../assets/shipping.png')}
                        />
                        <Text style={{ fontSize: 13 }}>Fast Shipping</Text>
                    </View>
                    {/* <Image/> */}
                    <View style={styles.sectionBtns}>
                        <Pressable
                            style={styles.btnAdd}
                            onPress={() => {
                                if (status === 'unauthenticated' || status === 'checking') {
                                    navigate('LoginScreen')
                                    return
                                }
                                hadleAddToCart(product.id!)
                            }}
                        >
                            {isLoading && product.id! ? (
                                <ActivityIndicator color={colors.orange} size={30} />
                            ) :
                                <Icon name='cart-outline' color={colors.orange} size={25} />
                            }
                        </Pressable >

                        {/* Section favorites */}
                        <View style={styles.btnFav}>
                            {status === 'unauthenticated' ?
                                <Icon onPress={() => navigate('LoginScreen')} name='heart-outline' color={colors.blue} size={30} />
                                : isLoadingFavorite ? <ActivityIndicator size={25} color={colors.blue} /> :

                                    isFav ? (
                                        <Pressable onPress={async () => {
                                            const resp = await removeFavorite(product.id!)
                                            setIsFav(resp)

                                        }} ><Icon name='heart' color={colors.blue} size={25} /></Pressable>
                                    ) : (
                                        <Pressable onPress={async () => {
                                            const resp = await addFavorite(product)
                                            setIsFav(resp)

                                        }}><Icon name='heart-outline' color={colors.blue} size={25} /></Pressable>
                                    )
                            }

                        </View>
                        {/*end section favorites  */}

                    </View>
                </View>
            </View>
        </>
    )

}

export default ProductCard