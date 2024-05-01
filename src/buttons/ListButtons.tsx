import { Dispatch, SetStateAction, useState } from "react"
import UsePagination from "../hooks/pagination/usePagination"
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackRootParams } from "../routes/Navigator";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { colors } from "../colors/colors";
import { ParamsType } from "../screens/products/ProductsScreen";
import { Product } from "../interfaces/products";
import { useProductsStore } from "../store/products/useProducts";
import Icon from 'react-native-vector-icons/Ionicons';

interface ListButtonsProps {
    currentPage: number,
    totalPages: number,
    renderPaginationButtons: Function,
    setOffset: Dispatch<SetStateAction<number>>,
    products :  Product[]


}

const ListButtons = ({ currentPage, totalPages, setOffset, renderPaginationButtons,products }: ListButtonsProps) => {

    const { navigate } = useNavigation<StackNavigationProp<StackRootParams>>();
    const {} = useProductsStore();

    return (
        <View style={[styles.containerButtons, {
            marginTop : products.length  === 2 ? 170 : 20
        }]} >
            {
                totalPages > 1 && (

                    <Pressable

                        disabled={currentPage === 1}
                        style={[{ 
                                borderColor: currentPage === 1 ? colors.sky : colors.blue 
                                
                            }, styles.button]}

                        onPress={() => {
                            setOffset(currentPage - 1)

                        }}
                    >
                        <Icon name="arrow-back-circle-outline" color={colors.blue}  size={35}/>
                    </Pressable>
                )
            }

            
            {renderPaginationButtons()}

            {totalPages  > 1 && (

                <Pressable
                    disabled={Number(totalPages) === currentPage}
                    style={[{ borderColor: Number(totalPages) === currentPage ? colors.blue : colors.sky }, styles.button]}

                    onPress={() => {
                        setOffset(currentPage + 1)

                    }}
                ><Icon name="arrow-forward-circle-outline" color={colors.blue}  size={35}/>
                </Pressable>
            )}

        </View>
    )
}
const styles = StyleSheet.create({
    containerButtons: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        gap: 5,
        marginBottom : 10
    },
    button: {
        padding: 7,
        backgroundColor: colors.sky,
        borderRadius: 5
    },
    textButton: {
        fontSize: 15,
        color: colors.blue
    }

})
export default ListButtons