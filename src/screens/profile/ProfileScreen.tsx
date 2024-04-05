import { Pressable, StyleSheet, ToastAndroid, StatusBar, Image, ActivityIndicator, View } from 'react-native';
import LayoutMain from '../../layouts/LayoutMain'
import { useAuthStore } from '../../store/useAuth';
import { Text, Layout, Input, Button } from '@ui-kitten/components';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons'
import useToastAnimation from '../../hooks/animations/useToast';
import { useForm, Controller } from "react-hook-form"
import { colors } from '../../colors/colors';
import { User } from '../../interfaces/User';


const ProfileScreen = () => {
    const { user, updateProfile, success, isLoading, checkStatus } = useAuthStore();

    //Profile states
    const [disabledName, setDisabledName] = useState(true);
    const [disabledEmail, setDisabledEmail] = useState(true);
    const [disabledPhone, setDisabledPhone] = useState(true);
    const { control, formState: { errors }, handleSubmit, setError, clearErrors } = useForm({
        defaultValues: user
    });

    const { CustomToast, showToast } = useToastAnimation(
        {
            type: 'success',
            text1: 'Your data was updated correctly',
            iconName: 'checkmark-outline',


        }
    );

    const onSubmit = async (infoUser: User) => {
        await updateProfile(infoUser)
        setDisabledEmail(true)
        setDisabledName(true)
        setDisabledPhone(true)
    };


    useEffect(() => {
        if (success) {
            showToast();
        }
    }, [success, showToast]);

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

                    {/* Field input */}
                    <Layout style={styles.inputCard}>
                        <Text style={styles.textLabel}>Name</Text>
                        {errors.name?.type === 'required' && <Text style={styles.errorText}>Name is required</Text>}
                        {errors.name?.type === 'maxLength' && <Text style={styles.errorText}>Name is too large</Text>}
                        <View style={{ flexDirection: 'row' }}>
                            <Controller
                                control={control}
                                rules={{ required: true, maxLength: 50 }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Input
                                        style={[styles.input, {
                                            borderColor: disabledName ? colors.grayLight : colors.blue
                                        }]}
                                        disabled={disabledName}
                                        textStyle={{ color: colors.blue }}
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                    />
                                )}
                                name='name'

                            />
                            <Pressable
                                style={styles.icon}
                                onPress={() => setDisabledName(!disabledName)}>
                                <Icon name='pencil-outline' size={20} />
                            </Pressable>
                        </View>

                    </Layout>
                    {/* Field input */}
                    <Layout style={styles.inputCard}>
                        <Text style={styles.textLabel}>Email</Text>
                        {errors.email?.type === 'required' && <Text style={styles.errorText}>Required field </Text>}
                        {errors.email?.type === 'pattern' && <Text style={styles.errorText}>It is not a valid email</Text>}
                        {errors.email?.type === 'maxLength' && <Text style={styles.errorText}>Email is too large</Text>}
                        <View style={{ flexDirection: 'row' }}>

                            <Controller
                                control={control}
                                rules={{ required: true, maxLength: 50 }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Input
                                        style={[styles.input, {
                                            borderColor: disabledEmail ? colors.grayLight : colors.blue
                                        }]}
                                        disabled={disabledEmail}
                                        textStyle={{ color: colors.blue }}
                                        onBlur={onBlur}
                                        onChangeText={(text) => {
                                            onChange(text);
                                            const isValidEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(text);
                                            if (!isValidEmail) {
                                                setError('email', {
                                                    type: 'pattern',
                                                    message: 'It is not a valid email',
                                                });
                                            } else {
                                                clearErrors('email');
                                            }
                                        }}


                                        value={value}
                                        placeholder='Example@gmail.com'
                                        accessoryLeft={<Icon name='mail-outline' size={25} />}
                                    />
                                )}
                                name='email'
                            />
                            <Pressable
                                style={styles.icon}
                                onPress={() => setDisabledEmail(!disabledEmail)}>
                                <Icon name='pencil-outline' size={20} />
                            </Pressable>
                        </View>

                    </Layout>
                    {/* Field input phone */}
                    <Layout style={styles.inputCard}>
                        <Text style={styles.textLabel}>Phone</Text>
                        {errors.phone?.type === 'required' && <Text style={styles.errorText}>Required field</Text>}
                        {errors.phone?.type === 'pattern' && <Text style={styles.errorText}>{errors?.phone?.message}</Text>}
                        {errors.phone?.type === 'maxLength' && <Text style={styles.errorText}>Phone is too large</Text>}
                        <View style={{ flexDirection: 'row' }}>

                            <Controller
                                control={control}
                                rules={{ required: true, minLength: 2, maxLength: 25 }}

                                render={({ field: { onBlur, onChange, value } }) => (
                                    <Input
                                        style={[styles.input, {
                                            borderColor: disabledPhone ? colors.grayLight : colors.blue
                                        }]}
                                        disabled={disabledPhone}
                                        textStyle={{ color: colors.blue }}
                                        onBlur={onBlur}
                                        onChangeText={(value) => {
                                            onChange(value);
                                            const isValidEmail = /^\d+$/.test(value);
                                            if (!isValidEmail) {
                                                setError('phone', {
                                                    type: 'pattern',
                                                    message: 'Must be a number',
                                                });
                                            } else {
                                                clearErrors('phone');
                                            }
                                        }}
                                        value={value}
                                        placeholder='+1 800 3935 54'
                                        accessoryLeft={<Icon name='call-outline' size={25} />}
                                    />
                                )}
                                name='phone'

                            />
                            <Pressable
                                style={styles.icon}
                                onPress={() => setDisabledPhone(!disabledPhone)}>
                                <Icon name='pencil-outline' size={20} />
                            </Pressable>
                        </View>

                    </Layout>
                    <Button
                        onPress={handleSubmit(onSubmit)}
                        style={styles.btn}
                    >
                        <Text style={styles.btnText}> Update profile</Text>

                    </Button>
                    {/*  */}
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
        borderRadius: 5,
        backgroundColor: '#fff'
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
export default ProfileScreen