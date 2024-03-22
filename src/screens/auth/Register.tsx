import { View, Text, ScrollView, Pressable } from 'react-native'
import { Input } from '@ui-kitten/components'
import LayoutMain from '../../layouts/LayoutMain'
import Icon from 'react-native-vector-icons/Ionicons';
import { StackRootParams } from '../../routes/Navigator';
import { StackScreenProps } from '@react-navigation/stack';
import { stylesAuth as style } from './styles';


interface Props extends StackScreenProps<StackRootParams, 'RegisterScreen'> { };


const RegisterScreen = ({ navigation }: Props) => {

    return (
        <LayoutMain>
            <ScrollView style={{ flex : 1}}>

                <View style={style.containerForm}>
                    {/* Card Input */}
                    <View style={style.inputCard}>
                        <Text style={style.labelText}>Email</Text>
                        <Input
                            style={style.input}
                            placeholder='Example@gmail.com'
                            accessoryLeft={<Icon name='mail-outline' size={25} />}
                        />

                    </View>
                    {/* Card Input */}
                    <View style={style.inputCard}>
                        <Text style={style.labelText}>Name</Text>
                        <Input
                            style={style.input}
                            placeholder='Your name'
                            secureTextEntry={true}
                            accessoryLeft={<Icon name='person-outline' size={25} />}

                        />
                    </View>
                    {/* Card Input */}
                    <View style={style.inputCard}>
                        <Text style={style.labelText}>Phone number</Text>
                        <Input
                            style={style.input}
                            placeholder='+1 800 3935 54'
                            secureTextEntry={true}
                            accessoryLeft={<Icon name='call-outline' size={25} />
                            
                        }

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

                        />
                    </View>
                    <Pressable style={style.btn}>
                        <Text style={style.btnText}>Register</Text>
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate('RegisterScreen')}>
                        <Text style={style.linkText}>Create account</Text>
                    </Pressable>
                </View>
            </ScrollView>

        </LayoutMain>

    )

}
export default RegisterScreen