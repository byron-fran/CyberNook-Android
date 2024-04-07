import { useEffect, useMemo, useState } from 'react';
import { useProductsStore } from '../../store/products/useProducts';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../../colors/colors';
import { ParamsType } from '../../screens/products/ProductsScreen';

const UsePagination = (listenCategegory: ParamsType) => {

    const { category, mark } = listenCategegory
    const { totalItems,
        products,
        getProducts,
        currentPage,
        resetPage,
        clearProducts,
        totalPages,

    } = useProductsStore()

    const maxButtons = 5; // Máximo de botones de paginación a mostrar

    const [offset, setOffset] = useState(currentPage);


    const calculatePaginationIndexes = () => {

        const halfMaxButtons = Math.floor(maxButtons / 2);
        let start = Math.max(1, currentPage - halfMaxButtons);
        let end = Math.min(totalPages, start + maxButtons - 1);

        if (end - start + 1 < maxButtons) {
            start = Math.max(1, end - maxButtons + 1);
        }

        return { start, end };
    }

    // Generar los botones de paginación dinámicamente
    const renderPaginationButtons = () => {
        const { start, end } = calculatePaginationIndexes();

        const buttons = [];
        for (let i = start; i <= end; i++) {
            buttons.push(
                <Pressable

                    key={i}

                    style={[{ 
                        backgroundColor: currentPage === i ? colors.blue : colors.sky,
                        borderRadius: 5,
                        justifyContent: 'center',
                        alignItems : 'center'
                        
                    
                    }, styles.button]}
                    onPress={() => setOffset(i)}
                >
                    <Text style={{
                        color: currentPage === i ? '#fff' : colors.blue,
                        fontSize : 15
                    }}>

                        {i}
                    </Text>
                </Pressable>
            );
        }

        return buttons;
    };

    useEffect(() => {
        if (Number(offset)) {
            getProducts(offset, category, mark).then((data) => { resetPage(data?.currentPage!) })
     
        }


    }, [offset]);

    useEffect(() => {
        return () => {
            clearProducts();
        }
    }, [])
    return {
        renderPaginationButtons,

        products,
        setOffset,
        totalPages,
        currentPage,


    }
}
const styles = StyleSheet.create({
    button: {
        paddingVertical: 10,
        padding: 30

    }
})
export default UsePagination