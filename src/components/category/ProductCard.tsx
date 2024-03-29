import { Product } from '../../interfaces/products'
import { FC } from 'react'
import { Layout, Text } from '@ui-kitten/components'
import { Image, Pressable, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { formatQuantity } from '../../helpers/formatQuanity'
import { StackRootParams } from '../../routes/Navigator'
import {  StackNavigationProp } from '@react-navigation/stack'

import { useNavigation } from '@react-navigation/native'

interface Props {
    product: Product,
    iconName: string
}
const ProductCard: FC<Props> = ({ product, iconName }) => {

    const { navigate } = useNavigation< StackNavigationProp<StackRootParams>>();

    return (
        <Layout style={style.card}>
            <Pressable
            onPress={() => navigate('ProductDetail', {id : product.id})} 
            style={{flex : 1}}>
                <Image

                    style={style.image}
                    source={{ uri: product.image }}
                />
            </Pressable>
            <Layout
                style={style.sectionInfo}
            >
                <Text style={style.textProduct}>
                    {product.name}
                </Text>
                {/* Section Prices */}
                <Layout style={style.sectionAllPrices}>
                    {product.discount > 0 && (
                        <Text style={style.textPriceOffer}>{formatQuantity(product.price - (product.price * (product.discount / 100)))}</Text>
                    )}
                    <Layout style={style.sectionPrices}>
                        {product.discount > 0 && (
                            <Text>On offer</Text>
                        )}
                        <Text style={style.textPrice}>{formatQuantity(product.price)}</Text>
                    </Layout>
                </Layout>
                {/* Section Shippjng */}
                <Layout style={style.sectionShipping}>
                    <Image
                        style={style.imgShipping}
                        source={require('../../assets/shipping.png')}
                    />
                    <Text>Fast Shipping</Text>
                </Layout>
                {/* <Image/> */}
                <Layout
                    style={style.sectionBtns}
                >
                    <Pressable
                        style={style.btnAdd}
                    >
                        <Icon name='cart-outline' color='#fff' size={30} />
                    </Pressable>
                    <Pressable
                        style={style.btnFav}
                    >
                        <Icon name={iconName} color='#fff' size={30} />
                    </Pressable>
                </Layout>
            </Layout>
        </Layout>
    )

}
const style = StyleSheet.create({
    card: {
        flexDirection: 'row',
        gap: 20,
        marginVertical: 15,

    },
    image: {
        width: '100%',
        height: 150,
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