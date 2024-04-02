import { PropsWithChildren, useEffect } from 'react'
import { useAuthStore } from '../store/useAuth'
import { StackRootParams } from '../routes/Navigator'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'


const AuthProvider = ({children} : PropsWithChildren) => {
    const {checkStatus, status} = useAuthStore();
    const {navigate, reset} = useNavigation<StackNavigationProp<StackRootParams>>();
    
    useEffect(() => {
        checkStatus()
    }, []);

    useEffect(() => {
        if(status !=='checking'){
            if(status === 'authenticated'){
                reset({
                    index : 0,
                    routes : [ { name : 'HomeScreen'}]
                })
            }
            else {
                reset({
                     index : 0,
                     routes : [{ name : 'LoginScreen'}]
                })
            }
        }
    }, [status]);
    
    return (
        <>
            {children}   
        </>

    )

}
export default AuthProvider