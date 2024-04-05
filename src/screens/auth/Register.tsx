import { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Input } from '@ui-kitten/components'
import LayoutMain from '../../layouts/LayoutMain'
import Icon from 'react-native-vector-icons/Ionicons';
import { StackRootParams } from '../../routes/Navigator';
import { StackScreenProps } from '@react-navigation/stack';
import { stylesAuth as style } from './styles';
import { User } from '../../interfaces/User';
import { useAuthStore } from '../../store/useAuth';
import { useForm, Controller } from "react-hook-form";

interface Props extends StackScreenProps<StackRootParams, 'RegisterScreen'> { };

const RegisterScreen = ({ navigation }: Props) => {

    const { register, errorRegister, clearErrors : clearErrosRegister } = useAuthStore();
    const [passwordSecure, setSecurePassword] = useState(true);

    const { control, formState: { errors }, handleSubmit, setError, clearErrors } = useForm({
        defaultValues: {} as User
    });

    const onSubmit = async (user: User) => {
        const result = await register(user);
        if (result) {
            navigation.navigate('HomeScreen');
            return
        }
    };

    useEffect(() => {

        return () => {
            clearErrosRegister()
        }
    }, []);

    return (
        <LayoutMain>

            <View style={style.containerForm}>
                <Text style={style.errorAuth}>{errorRegister.length > 0 && errorRegister}</Text>
                {/* Card Input */}
                <View style={style.inputCard}>
                    <Text style={style.labelText}>Email</Text>
                    {errors.email?.type === 'required' && <Text style={style.errorText}>Required field </Text>}
                    {errors.email?.type === 'pattern' && <Text style={style.errorText}>It is not a valid email</Text>}
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                            minLength: 1,
                            maxLength: 50
                        }}
                        render={({ field: { name, onChange, onBlur, value } }) => (
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
                {/* Card Input  name*/}
                <View style={style.inputCard}>
                    <Text style={style.labelText}>Name</Text>
                    {errors.name?.type === 'required' && <Text style={style.errorText}>Name is required</Text>}
                    <Controller
                        control={control}
                        rules={{ required: true, minLength: 2, maxLength: 50 }}
                        render={({ field: { onBlur, onChange, value } }) => (
                            <Input
                                style={style.input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder='Your name'
                                accessoryLeft={<Icon name='person-outline' size={25} />}
                            />
                        )}
                        name='name'

                    />
                </View>
                {/* Card Input phone number */}
                <View style={style.inputCard}>
                    <Text style={style.labelText}>Phone number</Text>
                    {errors.phone?.type === 'pattern' && <Text style={style.errorText}>{errors?.phone?.message}</Text>}
                    <Controller
                        control={control}
                        rules={{ required: false, minLength: 2, maxLength: 25 }}

                        render={({ field: { onBlur, onChange, value } }) => (
                            <Input
                                style={style.input}
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
                </View>
                {/* Card Input password */}
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
                    onPress={handleSubmit(onSubmit)}
                    style={style.btn}>
                    <Text style={style.btnText}>Register</Text>
                </Pressable>
                <Pressable onPress={() => navigation.navigate('LoginScreen')}>
                    <Text style={style.linkText}>Login</Text>
                </Pressable>
            </View>


        </LayoutMain>

    )

}
export default RegisterScreen