import { Pressable, StyleSheet, TextInput } from 'react-native';
import LayoutMain from '../../layouts/LayoutMain'
import { Layout, Input, Button } from '@ui-kitten/components';
import { useState } from 'react';
import { colors } from '../../colors/colors';
import Icon from 'react-native-vector-icons/Ionicons'
import { StackRootParams } from '../../routes/Navigator';
import { StackScreenProps } from '@react-navigation/stack';
import { useReviewStore } from '../../store/reviews/useReviewsStore';


interface Props extends StackScreenProps<StackRootParams, 'AddReviewScreen'>{}
const AddReviewScreen = ({route, navigation} : Props) => {
    const {addNewReview} = useReviewStore()
    const [valueStar, setValueStar] = useState<number>(0);
    const [comment, setComment] = useState<string>('');
    const {productId} = route.params

    const handleStarClick = (selectedStar: number) => {
        setValueStar(selectedStar === valueStar ? 0 : selectedStar);
    };
    const onSubmit = async () => {
        await addNewReview({comment, stars : valueStar,ProductId : productId});
        navigation.navigate('ProductDetail', {id : productId})
    }
    return (
        <LayoutMain>
            <Layout style={styles.container}>
                <Layout style={styles.containerStars}>
                    {Array.from({length : 5},(_, index ) => {
                        let star = index + 1
                       return (
                        <Pressable 
                            key={index}
                            onPress={() => handleStarClick(star)}
                            >
                            <Icon name={`${star <= valueStar ? 'star' : 'star-outline'}`} color={colors.yellow} size={30} />
                        </Pressable>
                       )
                    } )}
                </Layout>
                <Input
                    numberOfLines={15}
                    multiline={true}
                    textAlignVertical='top'
                    style={styles.input}
                    value={comment}
                    onChangeText={(value) => setComment(value)}
                />
                <Button onPress={onSubmit} style={styles.btnAdd}>Add Review</Button>
            </Layout>
        </LayoutMain>

    )

};

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        paddingBottom: 40
    },
    containerStars : {
        flexDirection : 'row',
        columnGap : 10,
        width: '90%',
        marginHorizontal: '5%',
        marginBottom : 10
    },
    input: {
        width: '90%',
        marginHorizontal: '5%',
    },
    btnAdd: {
        backgroundColor: colors.blue,
        width: '90%',
        marginHorizontal: '5%',
        marginTop: 30,

    }
})
export default AddReviewScreen