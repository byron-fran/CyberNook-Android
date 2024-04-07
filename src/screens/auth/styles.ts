import { StyleSheet } from "react-native";

export const stylesAuth = StyleSheet.create({
    containerForm: {
        marginVertical: 150,
        borderColor: '#E0E0E0',
        width: '90%',
        borderWidth: 1,
        marginHorizontal: '5%',
        borderRadius: 5
    },
    input: {
        borderColor: '#E0E0E0',
        width: '90%',
        marginHorizontal: '5%',
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
    



    },
    labelText: {
        marginLeft: 20,
        marginVertical: 5,
        color: '#000'
    },
    inputCard: {
        marginVertical: 10
    },
    btn: {
        width: '90%',
        marginHorizontal: '5%',
        backgroundColor: '#0854A5',
        padding: 10,
        borderRadius: 5,
        marginVertical: 25

    },
    btnText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 25
    },
    linkText: {
        marginLeft: 20,
        color: '#0854A5',
        marginBottom: 20
    },
    errorAuth : {
        textAlign : 'center',
        color : '#EF4444',
        marginTop : 10

    },
    errorText  : {
        textAlign : 'center',
        color : '#EF4444',
        marginTop : 10
    }
})