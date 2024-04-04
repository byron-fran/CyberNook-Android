import { StackRootParams } from '../../routes/Navigator';
import { StackScreenProps } from '@react-navigation/stack';
import { useProductsStore } from '../../store/useProducts';
import Loading from '../../components/loading/Loading';
import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet } from 'react-native';
import { Layout, Text, Select, SelectItem, IndexPath } from '@ui-kitten/components';
import SearchBar from '../../components/searchBar/SearchBar';
import { useEffect, useState } from 'react';
import { formatQuantity } from '../../helpers/formatQuanity';
import Icon from 'react-native-vector-icons/Ionicons'
import Reviews from '../../components/reviews/Reviews';
import { Order, useCartStore } from '../../store/cart/useCart';
import { useAuthStore } from '../../store/useAuth';
import { Product } from '../../interfaces/products';
import useToastAnimation from '../../hooks/animations/useToast';
import { createOrder } from '../../utilities/createOrder';

interface Props extends StackScreenProps<StackRootParams, 'ProductDetail'> { };

const ProductDetail = ({ route: { params }, navigation }: Props) => {
    const { id } = params;
    const { status } = useAuthStore()
    const { getProductById, isLoading } = useProductsStore();
    const [selectedIndex, setSelectIndex] = useState<IndexPath | IndexPath[]>(new IndexPath(0));
    const [product, setProduct] = useState<Product>({} as Product);
    
    const { addToCart, updateOrderById, cart, isLoading: loading, success } = useCartStore();

    const { CustomToast, showToast } = useToastAnimation(
        {
            type: 'success',
            text1: 'Add to cart success',
            iconName: 'cart-outline',
            colorText: '#F97316',
            borderColor: '#F97316'
        }
    )

    useEffect(() => {
        getProductById(id).then((data: Product) => {
            if (data) {
                setProduct(data);
                return
            }
        });
 

    }, [])

    useEffect(() => {
        if (success) {
            showToast()
        }
    }, [showToast, success]);

    const handleAddToCart = async (): Promise<void> => {

        const quantity = Number(selectedIndex.toString());

        const order = createOrder(product, quantity, id);

        const orderFind = cart?.find(order => order.ProductId === product.id);

        if (orderFind) {
          
            await updateOrderById(orderFind?.id!, order)
        }
        else {

            await addToCart(order)
        }
    }
    
  
  
    return (
        <>
            <CustomToast />
            <ScrollView>
                <SearchBar />
                {isLoading || product.image === undefined ?
                    <Loading heightContainer={500} />
                    : (
                        <Layout style={styles.container}>
                            <Layout style={styles.card}>
                                <Text style={styles.title}>{product?.name}</Text>

                                <Image style={styles.image} source={{ uri: product.image }} />

                                <Layout style={styles.section}>
                                    {/* Selects quantity */}
                                    <Select
                                        style={styles.select}
                                        label={() => <Text style={styles.textSelect}>Quantity</Text>}
                                        value={selectedIndex.toString()}
                                        selectedIndex={selectedIndex}
                                        onSelect={(index: IndexPath[] | IndexPath) => setSelectIndex(index)}
                                    >
                                        {Array.from({ length: product.stock! }, (_, index) => (
                                            <SelectItem key={Math.random().toString()} title={index + 1} />
                                        ))}
                                    </Select>

                                    <Layout style={styles.sectionPrice}>
                                        {product.discount > 0 && (

                                            <Text style={styles.textNoDiscount}>{formatQuantity(product.price)}</Text>
                                        )}
                                        <Text style={styles.price}>{formatQuantity(product.price - (product.price * (product.discount / 100)))} </Text>
                                    </Layout>
                                </Layout>
                                <Pressable
                                    style={[styles.btnAdd,]}
                                    onPress={() => {
                                        if (status === 'unauthenticated' || status === 'checking') {
                                            navigation.navigate('LoginScreen')
                                            return
                                        }
                                        handleAddToCart()
                                    }}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <ActivityIndicator color='#F97316' size={30} />
                                    ) : <>

                                        <Icon name='cart-outline' color='#F97316' size={30} />
                                        <Text style={styles.textAdd}>Add to cart</Text>
                                    </>}
                                </Pressable>
                                {/* Description of the product */}
                                <Layout>
                                    <Text style={styles.textDescription}>Description</Text>
                                    <Text>{product.description}</Text>
                                </Layout>
                                {/* Reviews */}
                                <Layout>
                                    <Reviews productId={product.id!} />
                                </Layout>
                            </Layout>
                        </Layout>
                    )
                }

            </ScrollView>
        </>

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
        alignItems: 'flex-end'
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

        padding: 3, width: 150,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        height: 'auto'


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