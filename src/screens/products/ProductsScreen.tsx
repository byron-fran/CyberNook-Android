import { View, Text, ScrollView, StyleSheet } from 'react-native'
import SearchBar from '../../components/searchBar/SearchBar'
import { useProductsStore } from '../../store/products/useProducts'
import Navbar from '../../components/nav/NavBar'
import ProductCard from '../../components/products/ProductCard/ProductCard'
import { useEffect, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack'
import { StackRootParams } from '../../routes/Navigator'
import Loading from '../../components/loading/Loading';
import ListButtons from '../../buttons/ListButtons'
import UsePagination from '../../hooks/pagination/usePagination';

export interface ParamsType {
    category?: string,
    mark?: string,
};

interface Props extends StackScreenProps<StackRootParams, 'ProductsScreen'> { }

const ProductsScreen = ({ route: { params } }: Props) => {
    const [listenCategegory, setListenCategory] = useState<ParamsType>({} as ParamsType)
    const { category, mark } = params;
    const { getProducts, products, clearProducts, currentPage, isLoading, } = useProductsStore();

    const { renderPaginationButtons, setOffset, totalPages, } = UsePagination(listenCategegory);

    useEffect(() => {
        if (category || mark) {

            getProducts(1, category, mark)
            setListenCategory({
                category,
                mark
            })
        }

    }, [category, mark]);

    useEffect(() => { return () => { clearProducts() }}, [])

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
            <SearchBar />
            <Navbar />
            <View style={{ flex: 1, height: '100%' }}>
                {isLoading ? <Loading heightContainer={400} /> : (
                    <>
                        {products.length > 0 ? products.map(product => {

                            return (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            )
                        }) :
                            <View style={styles.conatinerNoResult}>
                                <Text style={styles.textNoResult}>Nothing was found</Text>
                            </View>}

                        <ListButtons
                            currentPage={currentPage}
                            renderPaginationButtons={renderPaginationButtons}
                            setOffset={setOffset}
                            totalPages={totalPages}
                            products={products}
                        />
                    </>

                )}
            </View>
        </ScrollView>

    )

};
const styles = StyleSheet.create({
    conatinerNoResult: {
        height: 400,
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    textNoResult: {
        fontWeight: 'bold',
        color: '#000',
        fontSize: 30
    }
})
export default ProductsScreen