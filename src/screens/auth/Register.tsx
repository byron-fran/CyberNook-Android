import { View, Text, ScrollView, Pressable } from 'react-native'
import { Input } from '@ui-kitten/components'
import LayoutMain from '../../layouts/LayoutMain'
import Icon from 'react-native-vector-icons/Ionicons';
import { StackRootParams } from '../../routes/Navigator';
import { StackScreenProps } from '@react-navigation/stack';
import { stylesAuth as style } from './styles';
import { useState } from 'react';
import { User } from '../../interfaces/User';
import { useAuthStore } from '../../store/useAuth';

interface Props extends StackScreenProps<StackRootParams, 'RegisterScreen'> { };


const RegisterScreen = ({ navigation }: Props) => {

    const { register, errorRegister } = useAuthStore();

    const [userInfo, setUserInfo] = useState<User>({} as User);

    const onSubmit = async () => {
        const result = await register(userInfo);
        if (result) {
            navigation.navigate('HomeScreen');
            return
        }
    }
    return (
        <LayoutMain>


            <View style={style.containerForm}>
                <Text style={style.errorAuth}>{errorRegister.length > 0 && errorRegister}</Text>
                {/* Card Input */}
                <View style={style.inputCard}>
                    <Text style={style.labelText}>Email</Text>
                    <Input
                        style={style.input}
                        placeholder='Example@gmail.com'
                        accessoryLeft={<Icon name='mail-outline' size={25} />}
                        value={userInfo.email}
                        onChangeText={(value) => setUserInfo({ ...userInfo, email: value })}
                    />

                </View>
                {/* Card Input */}
                <View style={style.inputCard}>
                    <Text style={style.labelText}>Name</Text>
                    <Input
                        style={style.input}
                        placeholder='Your name'
                        accessoryLeft={<Icon name='person-outline' size={25} />}
                        value={userInfo.name}
                        onChangeText={(value) => setUserInfo({ ...userInfo, name: value })}
                    />
                </View>
                {/* Card Input */}
                <View style={style.inputCard}>
                    <Text style={style.labelText}>Phone number</Text>
                    <Input
                        style={style.input}
                        placeholder='+1 800 3935 54'
                        accessoryLeft={<Icon name='call-outline' size={25} />}
                        value={userInfo.phone}
                        onChangeText={(value) => setUserInfo({ ...userInfo, phone: value })}
                    />
                </View>
                {/* Card Input password */}
                <View style={style.inputCard}>
                    <Text style={style.labelText}>Password</Text>
                    <Input
                        style={style.input}
                        placeholder='Your password'
                        secureTextEntry={true}
                        accessoryLeft={<Icon name='lock-closed-outline' size={25} />}
                        value={userInfo.password}
                        onChangeText={(value) => setUserInfo({ ...userInfo, password: value })}
                    />
                </View>
                <Pressable
                    onPress={onSubmit}
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