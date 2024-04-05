import { Product } from '../../interfaces/products'
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { Layout, Text } from '@ui-kitten/components'
import { ActivityIndicator, Image, Pressable, StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { formatQuantity } from '../../helpers/formatQuanity'
import { StackRootParams } from '../../routes/Navigator'
import { StackNavigationProp } from '@react-navigation/stack'
import { useCartStore } from '../../store/cart/useCart'
import { useAuthStore } from '../../store/auth/useAuth'
import { useNavigation } from '@react-navigation/native'
import { createOrder } from '../../utilities/createOrder'


interface Props {
    product: Product,
    iconName: string,

    isFavorite: boolean,
    setIsFavorite: Dispatch<SetStateAction<boolean>>
};

const ProductCard: FC<Props> = ({ product, iconName, setIsFavorite, isFavorite }) => {
    const { updateOrderById, addToCart, cart } = useCartStore()
    const { navigate } = useNavigation<StackNavigationProp<StackRootParams>>();
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const {status} = useAuthStore();

    const hadleAddToCart = async (id: string): Promise<void> => {
        const order = createOrder(product, 1, id);
        const orderFind = cart.find(order => order.ProductId === id);

        if (orderFind) {
            setIsLoading(true)
            await updateOrderById(orderFind.id!, order)
            setIsLoading(false)
        }
        else {
            setIsLoading(true)
            await addToCart(order)
            setIsLoading(false)
        }
    };

    return (
        <>

            <View style={style.card}>
                <Pressable
                    onPress={() => navigate('ProductDetail', { id: product.id! })}
                    style={{ flex: 1 }}>
                    <Image

                        style={style.image}
                        source={{ uri: product.image !== null ? product.image : 'https://m.media-amazon.com/images/I/51bryY47IFL._SL1080_.jpg'  }}
                    />
                </Pressable>
                <View
                    style={style.sectionInfo}
                >
                    <Text
                        numberOfLines={1}
                        style={style.textProduct}>
                        {product.name}
                    </Text>
                    {/* Section Prices */}
                    <View style={style.sectionAllPrices}>
                        {product.discount > 0 && (
                            <Text style={style.textPriceOffer}>{formatQuantity(product.price - (product.price * (product.discount / 100)))}</Text>
                        )}
                        <View style={style.sectionPrices}>
                            {product.discount > 0 && (
                                <Text>On offer</Text>
                            )}
                            <Text style={style.textPrice}>{formatQuantity(product.price)}</Text>
                        </View>
                    </View>
                    {/* Section Shippjng */}
                    <View style={style.sectionShipping}>
                        <Image
                            style={style.imgShipping}
                            source={require('../../assets/shipping.png')}
                        />
                        <Text>Fast Shipping</Text>
                    </View>
                    {/* <Image/> */}
                    <View style={style.sectionBtns}>
                        <Pressable
                            style={style.btnAdd}
                            onPress={() => {
                                if(status === 'unauthenticated' || status === 'checking'){
                                    navigate('LoginScreen')
                                    return
                                }
                                hadleAddToCart(product.id!)
                            }}
                        >
                            {isLoading && product.id! ? (
                                <ActivityIndicator color='#fff' size={30} />
                            ) :
                                <Icon name='cart-outline' color='#fff' size={30} />
                            }
                        </Pressable>
                        <Pressable
                            style={style.btnFav}
                            onPress={() => setIsFavorite(!isFavorite)}>
                            <Icon name={iconName} color='#fff' size={30} />
                        </Pressable>
                    </View>
                </View>
            </View>
        </>
    )

}
const style = StyleSheet.create({
    card: {
        flexDirection: 'row',
        gap: 20,
        marginVertical: 25,
        alignItems: 'flex-start',
        backgroundColor : '#fff'

    },
    image: {
        width: '100%',
        height: 'auto',
        objectFit: 'contain',
        flex: 1
    },
    sectionInfo: {
        flex: 2,
        justifyContent: 'space-between'
    },
    textProduct: {
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold'
    },
    textPriceOffer: {
        color: '#EF4444',
        textDecorationLine: 'line-through',
        fontSize: 20,
        marginBottom: 0,
        padding: 0,

    },
    textPrice: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#0854A5',

    },
    sectionAllPrices: {
        justifyContent: 'flex-end',
        gap: 0,
        marginTop: 5

    },
    sectionPrices: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 10,
        marginTop: 0,
        alignItems: 'center'
    },
    sectionShipping: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',

    },
    sectionBtns: {
        flexDirection: 'row',
        gap: 20
    },
    imgShipping: {
        width: 30,
        height: 30
    },
    btnFav: {
        backgroundColor: '#0854A5',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 5

    },
    btnAdd: {
        backgroundColor: '#F97316',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 5
    }
})
export default ProductCard