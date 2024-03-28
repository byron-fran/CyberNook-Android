import { View, StyleSheet, Pressable, DrawerLayoutAndroid, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StackRootParams } from '../../routes/Navigator'
import { Text, Input, OverflowMenu, MenuItem, OverflowMenuProps, IndexPath } from '@ui-kitten/components';
import { useAuthStore } from '../../store/useAuth';
import { useRef, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons'
const SearchBar = () => {

    const { navigate } = useNavigation<StackNavigationProp<StackRootParams>>();
    const { status, user, logout } = useAuthStore()
    const [selectedIndex, setSelectedIndex] = useState<IndexPath>(new IndexPath(0));
    const [visible, setVisible] = useState(false);

    const onItemSelect = (index: any): void => {
        setSelectedIndex(index);
        setVisible(false);
    };

    return (
        <>
            <View style={{
                width: '100%',
                backgroundColor: '#0854A5',
                height: 165,
                borderBottomEndRadius: 20,
                borderBottomStartRadius: 20,

            }}>
                <View style={{ width: '90%', flexDirection: 'row', marginTop: 10, justifyContent: 'space-between', marginHorizontal: '5%', alignItems: 'center' }}>
                    <Pressable><Text style={{ fontSize: 30, color: "white", fontWeight: 'bold' }}>CyberNook</Text></Pressable>
                    {status === 'authenticated'
                        ?
                        <>


                            <OverflowMenu
                                visible={visible}
                                anchor={() => <Pressable onPress={() => setVisible(true)}>
                                    <Text style={{ fontSize: 17, color: 'white' }}>Hello, {user?.name!}</Text>
                                </Pressable>}
                                selectedIndex={selectedIndex}
                                onSelect={onItemSelect}
                                onBackdropPress={() => setVisible(false)}
                            >

                                <MenuItem
                                    accessoryRight={() => <Icon name='person-outline' size={20} />}
                                    title='Profile' onPress={() => { }}
                                />

                                <MenuItem
                                    accessoryRight={() => <Icon name='location-outline' size={20} />}
                                    title='Location' onPress={() => { }}
                                />
                                <MenuItem
                                    accessoryRight={() => <Icon name='log-out-outline' size={20} />}
                                    title='Logout' onPress={logout}
                                />
                            </OverflowMenu>
                        </>
                        : <Pressable
                            onPress={() => navigate('LoginScreen')}
                        >
                            <Text style={{ fontSize: 17, color: 'white' }}

                            >
                                Login
                            </Text>
                        </Pressable>
                    }
                </View>
                <View>
                    <Input
                        style={styles.input}
                        placeholder='Search for anything'
                    />
                </View>
            </View>

        </>


    )

}

const styles = StyleSheet.create({
    input: {
        width: '90%',
        marginHorizontal: '5%',
        marginTop: 20
    }
})
export default SearchBar