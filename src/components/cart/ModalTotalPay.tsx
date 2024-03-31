import { Layout, Text, Button} from '@ui-kitten/components';
import { Modal, Pressable, StyleSheet } from 'react-native';
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useCartStore } from '../../store/cart/useCart';
import { useAddressStore } from '../../store/useAddress';
import { formatQuantity } from '../../helpers/formatQuanity';
import { calculateTotalPrice } from '../../helpers/calculateTotalPrice';
import { colors } from '../../colors/colors';
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native';
import { StackRootParams } from '../../routes/Navigator';
import { StackNavigationProp } from '@react-navigation/stack';

interface Props {
    modalVisible: boolean,
    setModalVisible: Dispatch<SetStateAction<boolean>>
};

const ModalTotalPay = ({ modalVisible, setModalVisible }: Props) => {
    const { cart } = useCartStore();
    const { Address, isLoading, getAddress } = useAddressStore();
    const {navigate} = useNavigation<StackNavigationProp<StackRootParams>>()
    useEffect(() => {

        getAddress();
    }, []);

    const { totalQuantity, totalPriceToPay, save } = calculateTotalPrice(cart);
    const { city, country, exteriorNumber, postalCode, street } = Address

    return (

        <Modal
            visible={modalVisible}
            transparent={true}
            animationType='slide'
            style={{ flex: 1 }}
        >
            <Layout style={{
                backgroundColor: 'rgba(0,0,0, 0.7)',
                flex: 1,
                justifyContent: 'space-between',

            }}>

                {/* section button  close modal */}
                <Pressable style={styles.BtnClose} onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.BtnText}>X</Text>
                </Pressable>

                {/* section of payment and address */}
                <Layout style={styles.container}>
                    {postalCode === null ? (
                       <Button 
                        onPress={() => navigate('AddressScreen')}
                        style={{backgroundColor : colors.indigo}}
                        accessoryRight={() => <Icon name='add-circle-outline' color='#fff' size={30} />}
                        >Update your address</Button>

                    ) : (


                        <Layout style={styles.containerAddress}>
                            <Text style={styles.textPrimary}>
                                Exterior Number
                                {' '}
                                <Text style={styles.textSecundary}>{Address.exteriorNumber}</Text>
                            </Text>
                            <Text style={styles.textPrimary}>
                                Street
                                {' '}
                                <Text style={styles.textSecundary}>{Address.street}</Text>
                            </Text>

                            <Text style={styles.textPrimary}>
                                ZIP Code
                                {' '}
                                <Text style={styles.textSecundary}>{Address.postalCode}</Text>
                            </Text>
                            <Text style={styles.textPrimary}>
                                City
                                {' '}
                                <Text style={styles.textSecundary}>{Address.city}</Text>
                            </Text>
                            <Text style={styles.textPrimary}>
                                Country
                                {' '}
                                <Text style={styles.textSecundary}>{Address.country}</Text>
                            </Text>
                        </Layout>
                    )}

                    {/* container total to pay */}
                    <Layout style={styles.containerPayment}>
                        <Text style={styles.textPrimary}>
                            Quantity products {' '}
                            <Text style={styles.textSecundary}>{totalQuantity}</Text>
                        </Text>
                        <Text style={styles.textPrimary}>
                            Shipping cost {' '}
                            <Text style={styles.textSecundary}>{formatQuantity(0)}</Text>
                        </Text>

                        <Text style={styles.textPrimary}>
                            Save {' '}
                            <Text style={styles.textSecundary}>{formatQuantity(save)}</Text>
                        </Text>
                        <Text style={styles.textPrimary}>
                            Subtotal {' '}
                            <Text style={styles.textSecundary}>{formatQuantity(totalPriceToPay)}</Text>
                        </Text>
                        <Text style={[styles.textPrimary, { fontSize: 25 }]}>
                            Total {' '}
                            <Text style={[styles.textSecundary, { fontSize: 25 }]}>{formatQuantity(totalPriceToPay)}</Text>
                        </Text>
                    </Layout>
                </Layout>

                {/* section button to pay */}
                <Button style={styles.btnPay} onPress={() => { }}>Pay Now</Button>
            </Layout>
        </Modal>


    )
}


const styles = StyleSheet.create({

    BtnClose: {
        backgroundColor: '#EF4444',
        width: 50,
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        marginLeft: 20,
        marginTop: 20
    },
    BtnText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    textPrimary: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 3

    },
    textSecundary: {
        color: '#0854A5',
        fontSize: 18,
        marginLeft: 20

    },
    container: {
        width: '96%',
        marginHorizontal: '2%',
        padding: 20,
        backgroundColor: 'transparent',
        flexDirection: 'column',
        height: 'auto'

    },
    //Section payment
    containerAddress: {
        backgroundColor: '#fff',
        padding: 15,
        width: '100%',
        borderRadius: 5

    },
    containerPayment: {
        borderRadius: 5,
        padding: 15,
        marginTop: 20,
        width: '100%',



    },
    btnPay: {
        backgroundColor: '#4F46E5',
        width: '90%',
        marginHorizontal: '5%',
        marginBottom: 20,
        borderWidth: 0
    }
})

export default ModalTotalPay