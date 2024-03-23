import { useEffect } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { useCategoryStore } from '../../store/useCategoryStore'
import Loading from '../loading/Loading'

const Category = () => {
    const {getGategories, isLoading, categories} = useCategoryStore()
    useEffect(() => {
        getGategories()
    }, [])
    
    return (
        <>
            {!categories.length   ? 
                <Loading/> : 
                <View style={styles.container}>
                    <View style={styles.main}>
                        {categories?.length > 0 && categories.map(category => (
                            <View style={styles.card} key={category.id}>
                                <Text style={styles.nameCategory}>{category.name}</Text>
                                <Image style={styles.imgCategory} source={{uri : category.image}}/>
                            </View>
                        ))}
                    </View>
                </View>
            }
        </>

    )

}
const styles = StyleSheet.create({
    container : {
        flex : 1
    },
    main : {
        justifyContent : 'center',
        width : '90%',
        marginHorizontal : '5%',
        gap : 25,
        flexDirection : 'row',
        flexWrap : 'wrap'


    },
    card : {

    },
    nameCategory : {
        fontWeight : 'bold',
        fontSize : 20,
        color : '#000',
        marginVertical : 15
    },
    imgCategory : {
        width : 150,
        height : 150,
        objectFit : 'contain'
    },
})
export default Category