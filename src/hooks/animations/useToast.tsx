import { JSX, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons'
import Toast, { BaseToast, BaseToastProps, ToastType } from 'react-native-toast-message';
import { Layout } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

interface Props {
    type:  ToastType,
    text1?: string,
    text2?: string,
    iconName : string,
    borderColor? : string,
    colorText? : string

}
const useToastAnimation = ({ 
    type, 
    text1, 
    text2, 
    iconName = 'checkmark-outline',
    colorText = '#0854A5',
    borderColor = '#0854A5'
    } : Props) => {

    const showToast = () => {
        Toast.show({
            type,
            text1: text1 ? text1 : '',
            text2: text2 ? text2 : '',
            text1Style : {
                color : colorText
            }
        });
    }
    const toastConfig = {
        success: (props: JSX.IntrinsicAttributes & BaseToastProps) => (
            <BaseToast
                {...props}
                renderLeadingIcon={() => <Icon name={iconName} color={colorText} size={30} />}
                style={{ borderColor: borderColor}}
            />
        )
    }
    const CustomToast = () => (
        <Layout style={styles.containerToast}>

            <Toast
                position='top'
                topOffset={30}
                config={toastConfig}
                
            />
        </Layout>
    )
    return {
        CustomToast,
        showToast
    }

}
const styles = StyleSheet.create({
    containerToast : {
        position: 'absolute', 
        left: 0, 
        right: 0, 
        top: 40, 
        flex: 1, 
        width: '100%', 
        zIndex: 100
    }
    
})
export default useToastAnimation