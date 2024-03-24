import { useQuery } from '@tanstack/react-query';
import { StackRootParams } from '../../routes/Navigator';
import { StackScreenProps } from '@react-navigation/stack';
import { useProductsStore } from '../../store/useProducts';
import Loading from '../../components/loading/Loading';
import { Image, Pressable, ScrollView, StyleSheet } from 'react-native';
import { Layout, Text, Select, SelectItem, IndexPath } from '@ui-kitten/components';
import SearchBar from '../../components/searchBar/SearchBar';
import { useEffect, useState } from 'react';
import { formatQuantity } from '../../helpers/formatQuanity';
import Icon from 'react-native-vector-icons/Ionicons'
import Reviews from '../../components/reviews/Reviews';
import { useIsFocused } from '@react-navigation/native';

interface Props extends StackScreenProps<StackRootParams, 'ProductDetail'> { };

const ProductDetail = ({ route: { params }, navigation }: Props) => {
    const { id } = params;
    const { getProductById } = useProductsStore();
    const [selectedIndex, setSelectIndex] = useState<IndexPath | IndexPath[]>(new IndexPath(0));
    const isFocused = useIsFocused();
    const { isLoading, data: product, refetch } = useQuery({
        queryKey: ['product'],
        queryFn: async () => getProductById(id),
        staleTime: 0
    });

    useEffect(() => {
        if (isFocused) {
          refetch();
        }
      }, [isFocused, refetch]);

    if (isLoading) return <Loading />
    if (!product) return null


    return (
        <ScrollView>
            <SearchBar />
            <Layout style={styles.container}>
                <Layout style={styles.card}>
                    <Text style={styles.title}>{product?.name}</Text>
                    <Image style={styles.image} source={{ uri: product.image }} />
                    <Layout style={styles.section}>
                        <Select
                            style={styles.select}
                            label={() => <Text style={styles.textSelect}>Quantity</Text>}
                            value={selectedIndex.toString()}
                            selectedIndex={selectedIndex}
                            onSelect={(index) => setSelectIndex(index)}
                        >
                            {Array.from({ length: product.stock }, (_, index) => (
                                <SelectItem key={Math.random().toString()} title={index + 1} />
                            ))}
                        </Select>

                        <Layout style={styles.sectionPrice}>
                            <Text style={styles.textNoDiscount}>{formatQuantity(product.price)}</Text>
                            <Text style={styles.price}>{formatQuantity(product.price - (product.price * (product.discount / 100)))}</Text>
                        </Layout>
                    </Layout>
                    <Pressable style={styles.btnAdd}>
                        <Icon name='cart-outline' color='#F97316' size={30} />
                        <Text style={styles.textAdd}>Add to cart</Text>
                    </Pressable>
                    {/* Description of the product */}
                    <Layout>
                        <Text style={styles.textDescription}>Description</Text>
                        <Text>{product.description}</Text>
                    </Layout>
                    {/* Reviews */}
                    <Layout>
                        <Reviews productId={product.id}/>
                    </Layout>
                </Layout>
            </Layout>
        </ScrollView>

    )

};

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        width: '90%',
        marginHorizontal: '5%',

    },
    title: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        marginVertical: 20,
        width: 'auto'
    },
    card: {
        backgroundColor: '#fff'
    },
    image: {
        width: '100%',
        height: 300,
        objectFit: 'contain'
    },
    section: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '90%',
        marginHorizontal: '5%',
        marginVertical: 25,
        gap: 20,
        alignItems: 'flex-start'
    },
    select: {
        width: 150,
        borderWidth: 0,

    },
    textSelect: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#0854A5',
        marginBottom: 4

    },
    sectionPrice: {
        width: 150,

        justifyContent: 'center',
        alignItems: 'center',



    },
    textNoDiscount: {
        marginBottom: 5,
        fontSize: 18,
        color: '#EF4444',
        textDecorationLine: 'line-through'

    },
    price: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
        backgroundColor: '#0854A5',
        borderRadius: 5,
        width: '100%',
        textAlign: 'center',
        padding: 5,


    },
    btnAdd: {
        borderWidth: 1,
        borderColor: '#F97316',
        borderRadius: 5,
        padding: 10,
        marginVertical: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
        alignItems: 'center'

    },
    textAdd: {
        color: '#F97316',
        textAlign: 'center',
        fontSize: 20
    },
    textDescription: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginVertical: 15,
        textAlign: 'center'
    }
})
export default ProductDetail