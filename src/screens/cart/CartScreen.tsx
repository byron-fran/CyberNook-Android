import LayoutMain from '../../layouts/LayoutMain';
import { useEffect, useState } from 'react';
import { Order, useCartStore } from '../../store/cart/useCart';
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
import { createOrder } from '../../utilities/createOrder';
import CartCard from '../../components/cart/CartCard';

interface Props extends BottomTabScreenProps<TabRootParams, 'CartScreen'> { };

const CartScreen = ({ navigation, route }: Props) => {
    const { cart, isLoading, deleteOrderById, updateOrderById } = useCartStore();
    const [] = useState()


    const [modalVisible, setModalVisible] = useState(false);



    return (
        <LayoutMain>
            {isLoading
                ? <Loading />
                :
                <Layout style={styles.container}>
                    {cart.length > 0 ? cart.map(order => (
                        
                       <CartCard order={order} key={generateId()}/>
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
})
export default CartScreen