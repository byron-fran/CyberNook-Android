import { View, Text, StyleSheet, Pressable, Alert } from 'react-native'
import { Input,  } from '@ui-kitten/components'
import LayoutMain from '../../layouts/LayoutMain'
import Icon from 'react-native-vector-icons/Ionicons';
import { StackRootParams } from '../../routes/Navigator';
import { StackScreenProps } from '@react-navigation/stack';
import { stylesAuth  as style } from './styles';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../../store/useAuth';


interface Props extends StackScreenProps<StackRootParams, 'LoginScreen'> { };


const LoginScreen = ({ navigation }: Props) => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const {token, login, errorLogin} = useAuthStore();



    const onSubmit = async () => {

        if(email === '' || password === ''){
            Alert.alert('Error validate', 'All field are required', [
                {
                    text : 'Ok',
                    onPress : () => {} 
                }
            ])
            return
            
        }
        else if(!email.includes('@') && !email.includes('.') ){
            Alert.alert('Error email', 'Email no valite', [
                {
                    text : 'Ok',
                    onPress : () => {},
              
                }
            ], {
               
                
            },)
            return
        }
        const result =  await login(email, password);
        if(result){
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
                    <Input
                        style={style.input}
                        placeholder='Example@gmail.com'
                        accessoryLeft={<Icon name='mail-outline' size={25} />}
                        value={email}
                        onChangeText={(value) => setEmail(value)}

                    />

                </View>
                {/* Card Input */}
                <View style={style.inputCard}>
                    <Text style={style.labelText}>Password</Text>
                    <Input
                        style={style.input}
                        placeholder='Your password'
                        secureTextEntry={true}
                        accessoryLeft={<Icon name='lock-closed-outline' size={25} />}
                        value={password}
                        onChangeText={(value) => setPassword(value)}
                    />
                </View>
                <Pressable 
                    style={style.btn}
                    onPress={onSubmit}
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