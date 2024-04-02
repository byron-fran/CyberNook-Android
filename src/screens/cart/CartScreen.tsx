import LayoutMain from '../../layouts/LayoutMain';
import { useEffect, useState } from 'react';
import { useCartStore } from '../../store/cart/useCart';
import { Layout, Text, Button } from '@ui-kitten/components';
import Loading from '../../components/loading/Loading';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { formatQuantity } from '../../helpers/formatQuanity';
import { generateId } from '../../helpers/generateId';
import ModalTotalPay from '../../components/cart/ModalTotalPay';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { TabRootParams } from '../../tabs/BottomTabs';
import { colors } from '../../colors/colors';

interface Props extends BottomTabScreenProps<TabRootParams, 'CartScreen'> { };

const CartScreen = ({ navigation, route }: Props) => {
    const { cart, isLoading, deleteOrderById } = useCartStore();


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
                                            <Icon name='remove-circle-outline' size={35} color={colors.orange} />
                                        </Pressable>
                                        <Text style={styles.textQuantity}>{order.quantity}</Text>
                                        <Pressable>
                                            <Icon name='add-circle-outline' size={35} color={colors.blue} />
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
                    )) : <Layout style={styles.containerNoCart}>
                        <Text style={{ fontSize: 30 }}>Cart Empty</Text>
                    </Layout>}
                </Layout>
            }
            <ModalTotalPay modalVisible={modalVisible} setModalVisible={setModalVisible} />
            {cart.length > 0 && (
                <Button style={styles.btnSeeTotal} onPress={() => setModalVisible(true)}>See total</Button>

            )}
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
    priceNoDiscount: {
        color: "#EF4444",
        textDecorationLine: 'line-through',
        fontSize: 15,

    },
    btnSeeTotal: {
        backgroundColor: '#4F46E5',
        borderWidth: 0,
        marginTop: 30,
        width: '90%',
        marginHorizontal: '5%',
    },
    containerNoCart: {
        flex: 1,
        backgroundColor: '#fff',
        height: 615,
        alignItems: 'center'
    },
    containerBtns : {
        flexDirection : 'row',
        alignItems : 'center',
        height : 40,
        gap : 10
    },
    textQuantity : {
        fontWeight : 'bold',
        fontSize : 22
    }
})
export default CartScreen