import { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useFavoriteStore } from '../../store/favorites/useFavoriteStore';
import ProductCard from '../../components/products/ProductCard/ProductCard';
import LayoutMain from '../../layouts/LayoutMain';

const FavoritesScreen = () => {

    const { favorites } = useFavoriteStore();

    return (
        <LayoutMain>
            <View style={{ flex: 1, height: '100%', marginTop: 20 }}>
                {favorites.length > 0 ? favorites.map(product => {

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
            </View>
        </LayoutMain>

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
export default FavoritesScreen