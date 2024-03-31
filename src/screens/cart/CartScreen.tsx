import LayoutMain from '../../layouts/LayoutMain';
import { useEffect, useState } from 'react';
import { useCartStore } from '../../store/cart/useCart';
import { Layout, Text } from '@ui-kitten/components';
import Loading from '../../components/loading/Loading';
import { Image, Pressable, StyleSheet, Modal, Alert, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { formatQuantity } from '../../helpers/formatQuanity';
import { generateId } from '../../helpers/generateId';
import { Button } from '@ui-kitten/components';
import ModalTotalPay from '../../components/cart/ModalTotalPay';

const CartScreen = () => {
    const { getCart, cart, isLoading, deleteOrderById } = useCartStore();

    useEffect(() => {
        getCart()
    }, []);

    const handleRemoveToCart = async (id: string): Promise<void> => {
        await deleteOrderById(id)
    };
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <LayoutMain>
            {isLoading
                ? <Loading />
                :
                <Layout style={styles.container}>
                    {cart.length > 0 ? cart.map(order => (
                        <Layout style={styles.card} key={generateId()}>
                            <Image
                                style={styles.image}
                                source={{ uri: order.image }}
                            />
                            <Layout style={styles.sectionInfo}>
                                <Text style={styles.orderName}>{order.name}</Text>
                                <Layout style={styles.sectionPrices}>
                                    <Layout>
                                        <Text style={styles.price}>Quantity {order.quantity} x 1</Text>
                                        <Text style={styles.price}>
                                            Price unity {' '}
                                            <Text style={styles.priceNoDiscount}>{formatQuantity(order.unitPrice!)}</Text>
                                            {' '}
                                            {formatQuantity(order.price!)}
                                        </Text>
                                    </Layout>
                                    <Pressable
                                        onPress={() => handleRemoveToCart(order.id!)}
                                    >
                                        <Icon name='trash-outline' size={30} color='#EF4444' />
                                    </Pressable>
                                </Layout>
                            </Layout>
                        </Layout>
                    )) : <Layout>
                        <Text>Cart Empty</Text>
                    </Layout>}
                </Layout>
            }
            <ModalTotalPay modalVisible={modalVisible} setModalVisible={setModalVisible}/>
            <Button onPress={() => setModalVisible(true)}>See total</Button>
        </LayoutMain>

    )

};
const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        gap: 20
    },
    card: {
        flexDirection: 'row',
        columnGap: 10
    },
    image: {
        width: '100%',
        objectFit: 'contain',
        height: 150,
        flex: 2,

    },
    sectionInfo: {
        flex: 3,

    },
    orderName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',

    },
    sectionPrices: {
        marginTop: 5,
        gap: 15
    },
    price: {
        fontSize: 15
    },
    priceNoDiscount: {
        color: "#EF4444",
        textDecorationLine: 'line-through',
        fontSize: 15,

    },


})
export default CartScreen