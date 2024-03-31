import { FC, useEffect } from 'react'
import { FlatList, Image, StyleSheet, View, Pressable } from 'react-native'
import { Review } from '../../interfaces/Review'
import { Layout, Text, Avatar } from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/Ionicons'
import { useReviewStore } from '../../store/reviews/useReviewsStore';
import Loading from '../loading/Loading';
import { useNavigation } from '@react-navigation/native';
import { StackRootParams } from '../../routes/Navigator';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuthStore } from '../../store/useAuth';

const Reviews: FC<{ productId: string }> = ({ productId }) => {

    const { getReviewsByProduct, reviews, isLoading } = useReviewStore();
    const { navigate } = useNavigation<StackNavigationProp<StackRootParams>>();
    const {user} = useAuthStore()
    useEffect(() => {

        getReviewsByProduct(productId);

    }, [reviews.length]);

    if (isLoading) return <Loading />;
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reviews {reviews.length}</Text>
            <Layout style={styles.containerButton}>
                <Pressable
                    onPress={() => navigate('AddReviewScreen', {productId})}
                >
                    <Icon name='add-circle-outline' color='#0854A5' size={40} />
                </Pressable>
            </Layout>
            <Layout >
                {reviews.length > 0 && reviews.map(review => {

                    const date = new Date(review.updatedAt!).toLocaleDateString('en-Us', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    })

                    return (
                        <Layout key={review.id}>
                            <Layout style={styles.infoReview}>
                                <Avatar size='large' source={require('../../assets/usuario.png')} />
                                <Layout>
                                    <Text style={styles.textUser}>{review.User?.name!}</Text>
                                    <Text style={styles.textDate}>{date}</Text>
                                </Layout>

                            </Layout>
                            {/* stars */}
                            <Layout style={styles.stars}>
                                {Array.from({ length: review.stars }, (_, index) => (
                                    <Icon name='star' size={20} color='#F1C40F' key={index + Math.random().toFixed()} />
                                ))}

                            </Layout>
                            {/* comment */}
                            <Layout>
                                <Text style={styles.comment}>{review.comment}</Text>
                            </Layout>
                        </Layout>
                    )
                })}

            </Layout>
            <Text></Text>
        </View>

    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor : 'red',
        // padding : 10
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 20

    },

    containerButton: {
        marginBottom: 10,
        justifyContent: 'flex-end',
        width: '90%',
        alignItems: 'flex-end'
    },
    infoReview: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 20
    },
    textUser: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 17,
    },
    textDate: {
        color: '#0854A5'
    },
    stars: {
        flexDirection: 'row',
        marginTop: 5
    },
    comment: {
        marginVertical: 15,

    }

})
export default Reviews