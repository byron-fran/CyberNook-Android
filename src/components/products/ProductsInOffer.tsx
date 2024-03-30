import { View, Image, StyleSheet, Pressable, FlatList } from 'react-native'
import { Product } from '../../interfaces/products';
import { FC } from 'react';
import { Text } from '@ui-kitten/components';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation, NavigatorScreenParams } from '@react-navigation/native';
import { StackRootParams } from '../../routes/Navigator';



interface Props {
    products : Product[],
    isLoading : boolean
}

const ProductsInOffer: FC<Props> = ({ products, isLoading }) => {

    const navigate = useNavigation<StackNavigationProp<StackRootParams>>();

   
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
    const productOne = findProductMoreOffer();

    const productsInOffer = products.filter(product => product.discount > 0 && product.discount <= 10).slice(0, 10);


    
  
    
    return (
        <View style={{ flex: 1, height: '100%' }}>
            

                 <View style={styles.card}>
                <Image
                    style={styles.imgProduct}
                    source={{ uri: productOne?.image }}
                />
                <Text style={styles.titleProduct}>{productOne?.name}</Text>
                <Text
                    style={styles.descriptionProduct}
                    numberOfLines={7}>{productOne?.description}
                </Text>
                <Pressable 
                    style={styles.btnAdd}
                    onPress={() => navigate.navigate('ProductDetail', {id : productOne?.id!})}
                    >
                    <Text style={styles.textAdd}>Shop now and save{' '}{productOne?.discount!}%</Text>
                </Pressable>
            </View>
            {/* products in offer by 10 percent(%) */}
                 <FlatList
                style={{ marginLeft : 20}}
                data={productsInOffer}
                renderItem={({ item }) => (
                    <View >
                        <Image
                            style={[styles.imgProduct, { height: 160 }]}
                            source={{ uri: item.image }}
                        />
                        <Text style={[styles.titleProduct, { textAlign: 'center', maxHeight: 100, height: 60 }]}>{item.name}</Text>
                        <Pressable 
                            style={styles.btnAdd}
                            onPress={() => navigate.navigate('ProductDetail', {id : item.id!})}
                            >
                            <Text style={[styles.textAdd, { textAlign: 'center' }]}>Save Up {item?.discount}%</Text>
                        </Pressable>
                    </View>
                )}
                
                keyExtractor={(item) => item.id!}
                horizontal={true}
                ItemSeparatorComponent={() => <View style={{ width: 13 }}></View>}
            
            /> 
        
        </View>

    )

};

const styles = StyleSheet.create({
    card: {
        width: '90%',
        marginHorizontal: '5%'
    },
    imgProduct: {
        width: '100%',
        objectFit: 'contain',
        height: 200,
        marginTop: 40
    },
    titleProduct: {
        fontSize: 22,
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
        width: '100%',
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius: 5,

    },
    textAdd: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20
    }

})
export default ProductsInOffer