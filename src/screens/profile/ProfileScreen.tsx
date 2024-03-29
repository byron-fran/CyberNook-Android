import { Pressable, StyleSheet } from 'react-native';
import LayoutMain from '../../layouts/LayoutMain'
import { useAuthStore } from '../../store/useAuth';
import { Text, Layout, Input, Button } from '@ui-kitten/components';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons'

const ProfileScreen = () => {
    const { user , updateProfile} = useAuthStore();
    const [infoUser, setInfoUser] = useState(user);
    //Profile states
    const [disabledName, setDisabledName] = useState(true);
    const [disabledEmail, setDisabledEmail] = useState(true);
    const [disabledPhone, setDisabledPhone] = useState(true);

    const onSubmit = async () => {
        await updateProfile(infoUser)
        setDisabledEmail(true)
        setDisabledName(true)
        setDisabledPhone(true)
    }
    return (
        <LayoutMain>
            <Layout style={styles.container}>
                {/* Field input */}
                <Layout style={styles.inputCard}>
                    <Text style={styles.textLabel}>Name</Text>
                    <Input
                        value={infoUser.name}
                        onChangeText={(value) => {
                            setInfoUser({...infoUser, name : value})
                        }}
                        
                        disabled={disabledName}
                        accessoryRight={() => <Pressable onPress={() => setDisabledName(!disabledName)}><Icon name='pencil-outline' size={20}/></Pressable>}
                    />  

                </Layout>
                {/* Field input */}
                <Layout style={styles.inputCard}>
                <Text style={styles.textLabel}>Email</Text>
                    <Input
                        value={infoUser.email}
                        onChangeText={(value) => {
                            setInfoUser({...infoUser, email : value})
                        }}
                        disabled={disabledEmail}
                        accessoryRight={() => <Pressable onPress={() => setDisabledEmail(!disabledEmail)}><Icon name='pencil-outline' size={20}/></Pressable>}

                       
                    />

                </Layout>
                {/* Field input */}
                <Layout style={styles.inputCard}>
                <Text style={styles.textLabel}>Phone</Text>
                    <Input
                        value={infoUser.phone}
                        onChangeText={(value) => {
                            setInfoUser({...infoUser, phone : value})
                        }}
                        disabled={disabledPhone}
                        accessoryRight={() => <Pressable onPress={() => setDisabledPhone(!disabledPhone)}><Icon name='pencil-outline' size={20}/></Pressable>}
                    />

                </Layout>
                <Button
                    onPress={onSubmit} 
                    style={styles.btn}
                    >
                    <Text style={styles.btnText}> Update profile</Text>
                   
                </Button>
            </Layout>
        </LayoutMain>

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
    inputCard : {
        paddingHorizontal : 20,
        marginVertical : 15
    },
    btn: {
        width: '90%',
        marginHorizontal: '5%',
        backgroundColor: '#0854A5',
        padding: 10,
        borderRadius: 5,
        marginVertical: 25
    },
    textLabel : {
        marginVertical : 10,
        color : '#0854A5'
    },
    btnText : {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 25
    }
})
export default ProfileScreen