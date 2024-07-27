import { useEffect, useState } from "react"
import { Pressable, View, Text, StyleSheet } from "react-native";
import { colors } from "../colors/colors";
import { useProductsStore } from "../store/products/useProducts";
import Icon from 'react-native-vector-icons/Ionicons'

const ListButtons = () => {

    const { nextPage, totalPages, previousPage, currentPage, products } = useProductsStore()

    const { getProducts } = useProductsStore();

    const handleChangePage = (page: number) => {
        getProducts(page)
    };

    return (
        <View style={[styles.containerButtons, {
            marginTop: products.length > 3 ? 20 : 160
        }]}>

            <Pressable
                disabled={previousPage === 0}
                onPress={() => handleChangePage(previousPage)}
 
            >
                <Icon style={{
                    opacity: previousPage === 0 ? 0.5 : 1
                }} name="arrow-back-circle-outline" color={colors.blue} size={40} />
            </Pressable>

            {Array.from({ length: totalPages }, (_, index) => {
                let i = index + 1
                return (
                    <Pressable
                        style={[styles.button, {
                            backgroundColor: currentPage === i ? colors.sky : 'white',
                            borderColor: currentPage === i ? 'transparent' : colors.blue
                        }]}
                        disabled={currentPage === i}
                        key={i}
                        onPress={() => handleChangePage(i)}
                    >
                        <Text style={styles.textButton} >{i}</Text>
                    </Pressable>
                )
            })}

            <Pressable
                disabled={nextPage === 0}
                onPress={() => handleChangePage(nextPage)}
            >
                <Icon style={{
                    opacity: nextPage === 0 ? 0.5 : 1
                }} name="arrow-forward-circle-outline" size={40} color={colors.blue} />
            </Pressable>
        </View>

    )
}
const styles = StyleSheet.create({
    containerButtons: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        gap: 5,
        marginBottom: 10,
        flexWrap: 'wrap'
    },
    button: {
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderWidth: 1, borderRadius: 5
    },
    textButton: {
        fontSize: 15,
        color: colors.blue
    }

})
export default ListButtons