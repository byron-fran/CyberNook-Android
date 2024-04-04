import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import { Order, useCartStore } from '../../store/cart/useCart';
import { FC, useState } from 'react';
import { Layout } from '@ui-kitten/components';
import { formatQuantity } from '../../helpers/formatQuanity';
import Icon from 'react-native-vector-icons/Ionicons'
import { colors } from '../../colors/colors';
import { updateOrderQuantity } from '../../utilities/updateOrder';

interface Props {
    order: Order
}
const CartCard: FC<Props> = ({ order }) => {

    const { deleteOrderById, updateOrderById } = useCartStore();

    const handleRemoveToCart = async (id: string): Promise<void> => {
        await deleteOrderById(id)
    };

    const handleUpdateOneQuantity = async (id: string, order: Order) => {
        const newOrder = updateOrderQuantity(order, 'increment')
        await updateOrderById(id!, { ...newOrder })

    };

    const handleRemoveOneQuantity = async (id: string, order: Order) => {

        if (order.quantity === 1) {
            await deleteOrderById(id);
            return
        };
        const newOrder = updateOrderQuantity(order,'decrement')
        await updateOrderById(id!, { ...newOrder })
    };

    return (
        <Layout style={styles.card} >
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
                            {
                                formatQuantity(order.discount > 0 ?
                                    (order.unitPrice! - (order.unitPrice! * (order.discount / 100)))
                                    : order.unitPrice!)

                            }
                        </Text>
                        <Text style={styles.price}>Total{' '}{formatQuantity(order.price!)} </Text>
                    </Layout>
                    <Layout style={styles.containerBtns}>
                        <Pressable>
                            <Icon
                                onPress={() => handleRemoveOneQuantity(order.id!, order)}
                                name='remove-circle-outline'


                                size={35}
                                color={colors.orange} />
                        </Pressable>
                        <Text style={styles.textQuantity}>{order.quantity}</Text>
                        <Pressable>
                            <Icon
                                onPress={() => handleUpdateOneQuantity(order.id!, order)}
                                name='add-circle-outline'
                                size={35}
                                color={colors.blue} />
                        </Pressable>
                        <Pressable
                            onPress={() => handleRemoveToCart(order.id!)}
                        >
                            <Icon name='trash-outline' size={30} color={colors.red} />
                        </Pressable>
                    </Layout>
                </Layout>
            </Layout>
        </Layout>

    )

}
const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        columnGap: 10,
        marginVertical: 10
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
    textQuantity: {
        fontWeight: 'bold',
        fontSize: 22
    },
    priceNoDiscount: {
        color: "#EF4444",
        textDecorationLine: 'line-through',
        fontSize: 15,

    },
    containerBtns: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        gap: 10
    },

})
export default CartCard