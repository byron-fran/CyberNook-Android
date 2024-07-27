import { StyleSheet } from "react-native";
import { colors } from "../../../colors/colors";

export const ProdcutCardStyles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        gap: 20,
        marginVertical: 25,
        alignItems: 'flex-start',
        backgroundColor: '#fff'

    },
    image: {
        width: '100%',
        height: 'auto',
        objectFit: 'contain',
        flex: 1
    },
    sectionInfo: {
        flex: 2,
        justifyContent: 'space-between'
    },
    textProduct: {
        fontSize: 17,
        color: '#000',
        fontWeight: 'bold'
    },
    textPriceOffer: {
        color: '#EF4444',
        textDecorationLine: 'line-through',
        fontSize: 14,
        marginBottom: 0,
        padding: 0,

    },
    textPrice: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#0854A5',

    },
    sectionAllPrices: {
        justifyContent: 'flex-end',
        gap: 0,
        marginTop: 5

    },
    sectionPrices: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 10,
        marginTop: 0,
        alignItems: 'center'
    },
    sectionShipping: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',

    },
    sectionBtns: {
        flexDirection: 'row',
        gap: 20
    },
    imgShipping: {
        width: 30,
        height: 30
    },
    btnFav: {

        paddingHorizontal: 15,
        paddingVertical: 2,
        borderRadius: 5,
        borderColor: colors.blue,
        borderWidth: 1

    },
    btnAdd: {

        paddingHorizontal: 15,
        paddingVertical: 2,
        borderRadius: 5,
        borderColor: colors.orange,
        borderWidth: 1
    }
})