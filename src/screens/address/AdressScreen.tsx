import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';
import LayoutMain from '../../layouts/LayoutMain'
import { useAuthStore } from '../../store/auth/useAuth';
import { Text, Layout, Input, Button } from '@ui-kitten/components';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons'
import { Address, Address as AddressInterface } from '../../interfaces/Address';
import { useAddressStore } from '../../store/address/useAddress';
import useToastAnimation from '../../hooks/animations/useToast';
import { useForm, Controller } from "react-hook-form";
import { colors } from '../../colors/colors';


const AddressScreen = () => {

    const {
        getAddress,
        Address,
        updateAddress,

        createAddress,
        isLoading,
        success } = useAddressStore();

    const { CustomToast, showToast } = useToastAnimation(
        {
            type: 'success',
            text1: 'Your address was updated correctly',
            iconName: 'checkmark-outline',
        }
    );
    const { status } = useAuthStore()
    const [infoAddress, setInfoAddress] = useState<AddressInterface>(Address)
    //Address disables  states
    const [disabledStreet, setDisabledStreet] = useState(true);
    const [disabledExteriorNumber, setDisabledExteriorNumber] = useState(true);
    const [disabledCodeZIP, setDisabledZIPCode] = useState(true);
    const [disabledCity, setDisabledCity] = useState(true);
    const [disabledCountry, setDisabledCountry] = useState(true);
    
    useEffect(() => {
        if (status === 'authenticated') {

            getAddress()
                .then((result: AddressInterface) => {
                    if (result) {
                        setInfoAddress(result);
                        return
                    }
                })
        }

    }, [getAddress]);

    const {
        control,
        formState: { errors },
        handleSubmit,
        setError,
        clearErrors
    } = useForm({ defaultValues: infoAddress });

    useEffect(() => {
        if (success) {
            showToast();
        }
    }, [success, showToast]);


    const onSubmit = async (data: Address) => {
        if (Address.id) {

            await updateAddress(Address.id, data)
        }
        else {
            await createAddress(data)
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
                        {errors.street?.type === 'required' && <Text style={styles.errorText}>Required field </Text>}
                        <View style={{ flexDirection: 'row' }}>
                            <Controller
                                rules={{ required: true, minLength: 1, maxLength: 50 }}
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Input
                                        style={[styles.input, {
                                            borderColor: disabledStreet ? colors.grayLight : colors.blue
                                        }]}
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        disabled={disabledStreet}
                                        textStyle={{ color: colors.blue }}
                                    />
                                )}
                                name='street'

                            />
                            <Pressable
                                style={styles.icon}
                                onPress={() => setDisabledStreet(!disabledStreet)}>
                                <Icon name='pencil-outline' size={20} />
                            </Pressable>
                        </View>

                    </Layout>
                    {/* Field input Interior number */}
                    <Layout style={styles.inputCard}>
                        <Text style={styles.textLabel}>Exterior number</Text>
                        {errors.exteriorNumber?.type === 'required' && <Text style={styles.errorText}>Required field </Text>}
                        {errors.exteriorNumber?.type === 'pattern' && <Text style={styles.errorText}>{errors?.exteriorNumber?.message}</Text>}
                        <View style={{ flexDirection: 'row' }}>
                            <Controller
                                rules={{ required: true, minLength: 1, maxLength: 50 }}
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Input
                                        style={[styles.input, {
                                            borderColor: disabledExteriorNumber ? colors.grayLight : colors.blue
                                        }]}
                                        keyboardType='numeric'
                                        value={value?.toString()}
                                        onChangeText={(value) => {
                                            onChange(value);
                                            const isValidEmail = /^\d+$/.test(value);
                                            if (!isValidEmail) {
                                                setError('exteriorNumber', {
                                                    type: 'pattern',
                                                    message: 'Must be a number',
                                                });
                                            } else {
                                                clearErrors('exteriorNumber');
                                            }
                                        }}
                                        textStyle={{ color: colors.blue }}
                                        onBlur={onBlur}
                                        disabled={disabledExteriorNumber}
                                    />
                                )}
                                name='exteriorNumber'

                            />
                            <Pressable
                                style={styles.icon}
                                onPress={() => setDisabledExteriorNumber(!disabledExteriorNumber)}>
                                <Icon name='pencil-outline' size={20} />
                            </Pressable>
                        </View>

                    </Layout>
                    {/* Field input Postal code */}
                    <Layout style={styles.inputCard}>
                        <Text style={styles.textLabel}>Postal Code</Text>
                        {errors.postalCode?.type === 'required' && <Text style={styles.errorText}>Required field </Text>}
                        {errors.postalCode?.type === 'pattern' && <Text style={styles.errorText}>{errors?.postalCode?.message}</Text>}
                        <View style={{ flexDirection: 'row' }}>
                            <Controller
                                rules={{ required: true, minLength: 1, maxLength: 50 }}
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Input
                                        style={[styles.input, {
                                            borderColor: disabledCodeZIP ? colors.grayLight : colors.blue
                                        }]}
                                        value={value?.toString()}
                                        onChangeText={(value) => {
                                            onChange(value);
                                            const isValidEmail = /^\d+$/.test(value);
                                            if (!isValidEmail) {
                                                setError('postalCode', {
                                                    type: 'pattern',
                                                    message: 'Must be a number',
                                                });
                                            } else {
                                                clearErrors('postalCode');
                                            }
                                        }}
                                        textStyle={{ color: colors.blue }}
                                        onBlur={onBlur}
                                        disabled={disabledCodeZIP}
                                    />
                                )}
                                name='postalCode'

                            />
                            <Pressable
                                style={styles.icon}
                                onPress={() => setDisabledZIPCode(!disabledCodeZIP)}>
                                <Icon name='pencil-outline' size={20} />
                            </Pressable>
                        </View>

                    </Layout>
                    {/* Field input City */}
                    <Layout style={styles.inputCard}>
                        <Text style={styles.textLabel}>City</Text>
                        {errors.city?.type === 'required' && <Text style={styles.errorText}>Required field </Text>}
                        <View style={{ flexDirection: 'row' }}>
                            <Controller
                                rules={{ required: true, minLength: 1, maxLength: 50 }}
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Input
                                        style={[styles.input, {
                                            borderColor: disabledCity ? colors.grayLight : colors.blue
                                        }]}
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        textStyle={{ color: colors.blue }}
                                        disabled={disabledCity}
                                    />
                                )}
                                name='city'

                            />
                            <Pressable
                                style={styles.icon}
                                onPress={() => setDisabledCity(!disabledCity)}>
                                <Icon name='pencil-outline' size={20} />
                            </Pressable>
                        </View>

                    </Layout>
                    {/* Field input Street */}
                    <Layout style={styles.inputCard}>
                        <Text style={styles.textLabel}>Country</Text>
                        {errors.country?.type === 'required' && <Text style={styles.errorText}>Required field </Text>}
                        <View style={{ flexDirection: 'row' }}>
                            <Controller
                                rules={{ required: true, minLength: 1, maxLength: 50 }}
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Input
                                        style={[styles.input, {
                                            borderColor: disabledCountry ? colors.grayLight : colors.blue
                                        }]}
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        textStyle={{ color: colors.blue }}
                                        disabled={disabledCountry}
                                    />
                                )}
                                name='country'

                            />
                            <Pressable
                                style={styles.icon}
                                onPress={() => setDisabledCountry(!disabledCountry)}>
                                <Icon name='pencil-outline' size={20} />
                            </Pressable>
                        </View>

                    </Layout>
                    <Button
                        onPress={handleSubmit(onSubmit)}
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
    },
    errorText: {
        textAlign: 'center',
        color: '#EF4444',
        marginTop: 10
    },
    icon: {
        padding: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colors.grayLight,
        marginLeft: 5
    },
    input: {
        width: '90%'
    }
})
export default AddressScreen