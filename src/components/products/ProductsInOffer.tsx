import { View, Image, StyleSheet, Pressable } from 'react-native'
import { Product } from '../../interfaces/products';
import { FC } from 'react';
import { Text } from '@ui-kitten/components';


const ProductsInOffer: FC<{ products: Product[] }> = ({ products }) => {

    const findProductMoreOffer = () => {
        if (products.length === 0) return null
        let productGreatestOffer = products[0]

        products.forEach(product => {
            if (product.discount > productGreatestOffer.discount) {
                productGreatestOffer = product

            }
        })
        return productGreatestOffer
    };
    const product = findProductMoreOffer();


    if (product === null) return null

    return (
        <View>
            <View style={styles.card}>
                <Image
                    style={styles.imgProduct}
                    source={{ uri: product.image }}
                />
                <Text style={styles.titleProduct}>{product.name}</Text>
                <Text
                    style={styles.descriptionProduct}
                    numberOfLines={7}>{product.description}
                </Text>
                <Pressable style={styles.btnAdd}>
                    <Text style={styles.textAdd}>Shop now and save{' '}{product.discount}%</Text>
                </Pressable>
            </View>
            {/* products in offer */}
        </View>

    )

};

const styles = StyleSheet.create({
    card: {
        width: '80%',
        marginHorizontal: '10%'
    },
    imgProduct: {
        width: '100%',
        objectFit: 'contain',
        height: 200,
        marginTop: 40
    },
    titleProduct: {
        fontSize: 25,
        color: '#000',
        fontWeight: 'bold',
        marginTop: 20

    },
    descriptionProduct: {
        color: '#323232',
        fontSize: 13,
        marginTop: 20

    },
    btnAdd: {
        marginTop: 30,
        backgroundColor: '#F97316',
        width: '80%',
        padding: 15,
        borderRadius: 5,

    },
    textAdd: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20
    }

})
export default ProductsInOffer