import { JSX, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons'
import Toast, { BaseToast, BaseToastProps } from 'react-native-toast-message';


interface Props {
    type: string,
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
        <Toast
            position='top'
            topOffset={30}
            config={toastConfig}
            
        />
    )
    return {
        CustomToast,
        showToast
    }

}

export default useToastAnimation