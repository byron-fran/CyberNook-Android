import { useRef, useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import { OverflowMenu, MenuItem, IndexPath } from '@ui-kitten/components'
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { StackRootParams } from '../../routes/Navigator';
import { useAuthStore } from '../../store/useAuth'


const MenuItemsOverFlow = () => {

    const { user, logout } = useAuthStore()
    const { navigate } = useNavigation<StackNavigationProp<StackRootParams>>();
    const [selectedIndex, setSelectedIndex] = useState<IndexPath>(new IndexPath(0));
    const [visible, setVisible] = useState(false);
    const onItemSelect = (index: any): void => {
        setSelectedIndex(index);
        setVisible(false);
    };

    const  test = 'hola'
    return (

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
                onPress={() => navigate('ProfileScreen')}
                accessoryRight={() => <Icon name='person-outline' size={20} />}
                title='Profile'
            />

            <MenuItem
                onPress={() => navigate('AddressScreen')}
                accessoryRight={() => <Icon name='location-outline' size={20} />}
                title='Location'
            />
            <MenuItem
                accessoryRight={() => <Icon name='log-out-outline' size={20} />}
                title='Logout' onPress={logout}
            />
        </OverflowMenu>

    )

}
export default MenuItemsOverFlow