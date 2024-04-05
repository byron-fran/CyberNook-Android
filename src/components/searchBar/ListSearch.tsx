import { View, Text, StyleSheet, Pressable, Image } from 'react-native'
import { Product } from '../../interfaces/products';
import { StackNavigationProp } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/native'
import { StackRootParams } from '../../routes/Navigator'
import { Dispatch, SetStateAction } from 'react';
import Icon from 'react-native-vector-icons/Ionicons'
import { colors } from '../../colors/colors';

interface Props {
    productsFilterByName : Product[],
    productsFilterByNameLimit : Product[],
    productsFilterByCategory : Product[],
    productsFilterByCategoryLimit : Product[]
    producstFilterByMark : Product[]
    producstFilterByMarkLimit : Product[]
    setSearchTerm : Dispatch<SetStateAction<string>>
}
const ListSearch = (

        {   
            productsFilterByName, 
            productsFilterByNameLimit, 
            productsFilterByCategory,
            productsFilterByCategoryLimit,
            producstFilterByMark,
            producstFilterByMarkLimit,
            setSearchTerm,
            
        } : Props) => {


    const { navigate } = useNavigation<StackNavigationProp<StackRootParams>>();

    return (
        <>

            {/* list search */}
            {productsFilterByName.length >= 1 && productsFilterByName.length > productsFilterByCategory.length

                ? (

                    <View style={styles.containerSearch}>
                        {productsFilterByNameLimit.map(product => {
                            return (
                                <Pressable
                                    key={product.id}
                                    onPress={() => {
                                        navigate('ProductDetail', { id: product.id! })
                                        setSearchTerm('')
                                    }}
                                >
                                    <View style={styles.cardSearch}>
                                        <View style={styles.infoSearch}>

                                            <Image
                                                style={styles.imageSearch}
                                                source={{ uri: product.image }} />
                                            <Text>{product.name} </Text>
                                        </View>
                                        <Icon
                                            name='arrow-forward-circle-outline'
                                            size={30}
                                            color={colors.blue}
                                        />
                                    </View>
                                </Pressable>
                            )
                        })}
                    </View>
                ) :

                productsFilterByCategory.length >= 1
                    ?

                    (
                        <View style={styles.containerSearch}>
                            {productsFilterByCategoryLimit.map(product => {
                                return (
                                    <Pressable
                                        key={product.id}
                                        onPress={() => {
                                            navigate('ProductDetail', { id: product.id! })
                                            setSearchTerm('')
                                        }}
                                    >

                                        <View style={styles.cardSearch}>
                                            <View style={styles.infoSearch}>
                                                <Image
                                                    style={styles.imageSearch}
                                                    source={{ uri: product.image }} />
                                                <Text >{product.category} - {product.name}</Text>

                                            </View>
                                            <Icon
                                                name='arrow-forward-circle-outline'
                                                size={30}
                                                color={colors.blue}
                                            />
                                        </View>
                                    </Pressable>
                                )
                            })}
                        </View>

                    ) :
                    producstFilterByMark.length >= 1 ? (
                        <View style={styles.containerSearch}>
                            {
                                producstFilterByMarkLimit.map(product => {
                                    return (
                                        <Pressable
                                            key={product.id}
                                            onPress={() => {
                                                navigate('ProductDetail', { id: product.id! })
                                                setSearchTerm('')
                                            }}
                                        >
                                            <View style={styles.cardSearch}>
                                                <View style={styles.infoSearch}>
                                                    <Image
                                                        style={styles.imageSearch}
                                                        source={{ uri: product.image }} />
                                                    <Text>{product.mark!} - {product.name}</Text>
                                                </View>
                                                <Icon
                                                    name='arrow-forward-circle-outline'
                                                    size={30}
                                                    color={colors.blue}
                                                />
                                            </View>
                                        </Pressable>
                                    )
                                })
                            }
                        </View>
                    ) : null


            }
        </>

    )

};
const styles = StyleSheet.create({
    containerSearch: {
        zIndex: 999,
        position: 'absolute',
        backgroundColor: '#fff',
        width: '100%',
        minHeight: 800,
        top: 140,
        height: 'auto'
    },
    cardSearch: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        marginHorizontal: '5%',
        marginVertical: 10
    },
    infoSearch: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 10
    },
    imageSearch: {
        width: 35,
        height: 35,
        objectFit: "contain"

    }
})
export default ListSearch