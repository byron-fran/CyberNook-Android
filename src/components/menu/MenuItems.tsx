import { useState } from 'react'
import { Text, Pressable } from 'react-native'
import { OverflowMenu, MenuItem, IndexPath } from '@ui-kitten/components'
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { StackRootParams } from '../../routes/Navigator';
import { useAuthStore } from '../../store/useAuth'
import { useCartStore } from '../../store/cart/useCart'
import { useAddressStore } from '../../store/useAddress';

const MenuItemsOverFlow = () => {

    const { user, logout } = useAuthStore()
    const { navigate } = useNavigation<StackNavigationProp<StackRootParams>>();
    const [selectedIndex, setSelectedIndex] = useState<IndexPath>(new IndexPath(0));
    const [visible, setVisible] = useState(false);
    const { clearCart } = useCartStore();
    const { clearAddress } = useAddressStore();

    const onItemSelect = (index: any): void => {
        setSelectedIndex(index);
        setVisible(false);
    };
    const onLogout = () => {
        logout()
        clearCart()
        clearAddress()
    }
    return (

        <OverflowMenu
            visible={visible}
            anchor={() =>
                <Pressable onPress={() => setVisible(true)}>
                    <Text style={{ fontSize: 17, color: 'white', borderColor: 'red' }}>Hello, {user?.name!}</Text>
                </Pressable>
                }
            selectedIndex={selectedIndex}
            onSelect={onItemSelect}
            onBackdropPress={() => setVisible(false)}>

            <MenuItem
                onPress={() => navigate('ProfileScreen')}
                accessoryRight={() => <Icon name='person-outline' size={20} />}
                title='Profile'
                style={{
                    borderColor: 'red',

                }}
            />

            <MenuItem
                onPress={() => navigate('AddressScreen')}
                accessoryRight={() => <Icon name='location-outline' size={20} />}
                title='Address'
            />
            <MenuItem
                accessoryRight={() => <Icon name='log-out-outline' size={20} />}
                title='Logout' onPress={onLogout}
            />
        </OverflowMenu>

    )

}
export default MenuItemsOverFlow