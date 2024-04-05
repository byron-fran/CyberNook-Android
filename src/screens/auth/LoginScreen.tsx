import { View, Text, StyleSheet, Pressable, Alert, NativeSyntheticEvent, TextInputTextInputEventData } from 'react-native'
import { Input, } from '@ui-kitten/components'
import LayoutMain from '../../layouts/LayoutMain'
import Icon from 'react-native-vector-icons/Ionicons';
import { StackRootParams } from '../../routes/Navigator';
import { StackScreenProps } from '@react-navigation/stack';
import { stylesAuth as style } from './styles';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../../store/useAuth';
import { useForm, Controller } from "react-hook-form"

interface Props extends StackScreenProps<StackRootParams, 'LoginScreen'> { };

interface UserLogin {
    email: string,
    password: string,
};

const LoginScreen = ({ navigation }: Props) => {

    const { login, errorLogin } = useAuthStore();
    const [passwordSecure, setSecurePassword] = useState(true)

    const { control, formState: { errors }, handleSubmit, setError, clearErrors } = useForm({
        defaultValues: {} as UserLogin
    });

    const onSubmit = async (data: UserLogin) => {

        const result = await login(data.email, data.password);
        if (result) {
            navigation.navigate('HomeScreen')
            return
        }
    }

    return (
        <LayoutMain>
            <View style={style.containerForm}>
                <Text style={style.errorAuth}>{errorLogin && errorLogin}</Text>
                {/* Card Input */}
                <View style={style.inputCard}>
                    <Text style={style.labelText}>Email</Text>
                    {errors.email?.type === 'required' && <Text style={style.errorText}>Required field </Text>}
                    {errors.email?.type === 'pattern' && <Text style={style.errorText}>It is not a valid email</Text>}
                    <Controller
                        control={control}
                        rules={{ required: true, }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                style={style.input}
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
                </View>
                {/* Card Input */}
                <View style={style.inputCard}>
                    <Text style={style.labelText}>Password</Text>
                    {errors.password?.type === 'required' && <Text style={style.errorText}>Required field</Text>}

                    <Controller
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                style={style.input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder='Your password'
                                secureTextEntry={passwordSecure}
                                accessoryLeft={<Icon name='lock-closed-outline' size={25} />}
                                accessoryRight={
                                    passwordSecure ?
                                        <Icon
                                            onPress={() => setSecurePassword(false)}
                                            name='eye-outline' size={25} />
                                        : <Icon
                                            onPress={() => setSecurePassword(true)}
                                            name='eye-off-outline' size={25} />
                                }
                            />
                        )}
                        name='password'

                    />
                </View>
                <Pressable
                    style={style.btn}
                    onPress={handleSubmit(onSubmit)}
                >
                    <Text style={style.btnText}>Login</Text>
                </Pressable>
                <Pressable onPress={() => navigation.navigate('RegisterScreen')}>
                    <Text style={style.linkText}>Create account</Text>
                </Pressable>
            </View>

        </LayoutMain>

    )

}


export default LoginScreen