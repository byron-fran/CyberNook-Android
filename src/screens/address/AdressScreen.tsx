import { ActivityIndicator, Pressable, StyleSheet } from 'react-native';
import LayoutMain from '../../layouts/LayoutMain'
import { useAuthStore } from '../../store/useAuth';
import { Text, Layout, Input, Button } from '@ui-kitten/components';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons'
import { Address as AddressInterface } from '../../interfaces/Address';
import { useAddressStore } from '../../store/useAddress';
import useToastAnimation from '../../hooks/animations/useToast';

const AddressScreen = () => {

    const {
        getAddress,
        Address,
        updateAddress,
        deleteAddress,
        createAddress,
        isLoading,
        success } = useAddressStore();
    const { CustomToast, showToast } = useToastAnimation(
        {
            type: 'success',
            text1: 'Your address was updated correctly',
            iconName: 'checkmark-outline',
        }
    )
    const [infoAddress, setInfoAddress] = useState<AddressInterface>(Address)
    //Address states
    const [disabledStreet, setDisabledStreet] = useState(true);
    const [disabledExteriorNumber, setDisabledExteriorNumber] = useState(true);
    const [disabledCodeZIP, setDisabledZIPCode] = useState(true);
    const [disabledCity, setDisabledCity] = useState(true);
    const [disabledCountry, setDisabledCountry] = useState(true);

    useEffect(() => {
        getAddress()
            .then((result: AddressInterface) => {
                if (result) {
                    setInfoAddress(result);
                    return
                }
            })

    }, [getAddress]);

    useEffect(() => {
        if (success) {
            showToast();
        }
    }, [success, showToast]);


    const onSubmit = async () => {
        if (Address.id) {

            await updateAddress(Address.id, infoAddress)
        }
        else {
            await createAddress(infoAddress)
        };
        setDisabledCity(true)
        setDisabledCountry(true)
        setDisabledExteriorNumber(true)
        setDisabledStreet(true)
        setDisabledZIPCode(true)
    };

    return (
        <>
            <CustomToast />
            <LayoutMain>
                <Layout style={styles.container}>
                    {isLoading && (

                        <ActivityIndicator
                            style={{
                                position: 'absolute',
                                left: 0, right: 0,
                                top: 0, bottom: 0,
                                zIndex: 100
                            }}
                            size={40}
                            color='#0854A5'

                        />
                    )}

                    {/* Field input Street */}
                    <Layout style={styles.inputCard}>
                        <Text style={styles.textLabel}>Street</Text>
                        <Input
                            value={infoAddress?.street}
                            onChangeText={(value) => {
                                setInfoAddress({ ...infoAddress, street: value })
                            }}

                            disabled={disabledStreet}
                            accessoryRight={() => <Pressable onPress={() => setDisabledStreet(!disabledStreet)}><Icon name='pencil-outline' size={20} /></Pressable>}
                        />

                    </Layout>
                    {/* Field input Interior number */}
                    <Layout style={styles.inputCard}>
                        <Text style={styles.textLabel}>Exterior number</Text>
                        <Input
                            value={infoAddress.exteriorNumber}
                            keyboardType='numeric'
                            onChangeText={(value) => {
                                setInfoAddress({ ...infoAddress, exteriorNumber: value })
                            }}

                            disabled={disabledExteriorNumber}
                            accessoryRight={() => <Pressable onPress={() => setDisabledExteriorNumber(!disabledExteriorNumber)}><Icon name='pencil-outline' size={20} /></Pressable>}
                        />

                    </Layout>
                    {/* Field input Postal code */}
                    <Layout style={styles.inputCard}>
                        <Text style={styles.textLabel}>Postal Code</Text>
                        <Input
                            value={infoAddress.postalCode}
                            onChangeText={(value) => {
                                setInfoAddress({ ...infoAddress, postalCode: value })
                            }}

                            disabled={disabledCodeZIP}
                            accessoryRight={() => <Pressable onPress={() => setDisabledZIPCode(!disabledCodeZIP)}><Icon name='pencil-outline' size={20} /></Pressable>}
                        />

                    </Layout>
                    {/* Field input Street */}
                    <Layout style={styles.inputCard}>
                        <Text style={styles.textLabel}>City</Text>
                        <Input
                            value={infoAddress?.city}
                            onChangeText={(value) => {
                                setInfoAddress({ ...infoAddress, city: value })
                            }}

                            disabled={disabledCity}
                            accessoryRight={() => <Pressable onPress={() => setDisabledCity(!disabledCity)}><Icon name='pencil-outline' size={20} /></Pressable>}
                        />

                    </Layout>
                    {/* Field input Street */}
                    <Layout style={styles.inputCard}>
                        <Text style={styles.textLabel}>Country</Text>
                        <Input
                            value={infoAddress?.country}
                            onChangeText={(value) => {
                                setInfoAddress({ ...infoAddress, country: value })
                            }}

                            disabled={disabledCountry}
                            accessoryRight={() => <Pressable onPress={() => setDisabledCountry(!disabledCountry)}><Icon name='pencil-outline' size={20} /></Pressable>}
                        />

                    </Layout>
                    <Button
                        onPress={onSubmit}
                        style={styles.btn}
                    >
                        <Text style={styles.btnText}> {Address.id ? 'Update Address' : 'Create Address'}</Text>

                    </Button>
                </Layout>
            </LayoutMain>
        </>

    )

}

const styles = StyleSheet.create({
    container: {
        marginVertical: 150,
        borderColor: '#E0E0E0',
        width: '90%',
        borderWidth: 1,
        marginHorizontal: '5%',
        borderRadius: 5
    },
    inputCard: {
        paddingHorizontal: 20,
        marginVertical: 15
    },
    btn: {
        width: '90%',
        marginHorizontal: '5%',
        backgroundColor: '#0854A5',
        padding: 10,
        borderRadius: 5,
        marginVertical: 25
    },
    textLabel: {
        marginVertical: 10,
        color: '#0854A5'
    },
    btnText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 25
    }
})
export default AddressScreen