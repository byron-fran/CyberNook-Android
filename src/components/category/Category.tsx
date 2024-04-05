import { useEffect } from 'react'
import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import { useCategoryStore } from '../../store/category/useCategoryStore'
import Loading from '../loading/Loading'
import { useNavigation } from '@react-navigation/native'
import { StackRootParams } from '../../routes/Navigator'
import { StackNavigationProp } from '@react-navigation/stack';

const Category = () => {

    const { getGategories, isLoading, categories } = useCategoryStore();
    const navigate = useNavigation<StackNavigationProp<StackRootParams>>()
    useEffect(() => {
        getGategories()
    }, [])

    return (
        <>
            {!categories.length ?
                <Loading /> :
                <View style={styles.container}>
                    <View style={styles.main}>
                        {categories?.length > 0 && categories.map(category => (
                            <View style={styles.card} key={category.id}>
                                <Text style={styles.nameCategory}>{category.name}</Text>
                                <Pressable onPress={() => navigate.navigate('ProductsScreen', {category : category.name})}>
                                    <Image style={styles.imgCategory} source={{ uri: category.image }} />
                                </Pressable>
                            </View>
                        ))}
                    </View>
                </View>
            }
        </>

    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    main: {
        justifyContent: 'center',
        width: '90%',
        marginHorizontal: '5%',
        gap: 25,
        flexDirection: 'row',
        flexWrap: 'wrap'


    },
    card: {

    },
    nameCategory: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#000',
        marginVertical: 15
    },
    imgCategory: {
        width: 150,
        height: 150,
        objectFit: 'contain'
    },
})
export default Category