import { Pressable, StyleSheet, Text, TextInput } from 'react-native';
import LayoutMain from '../../layouts/LayoutMain'
import { Layout, Input, Button } from '@ui-kitten/components';
import { useState } from 'react';
import { colors } from '../../colors/colors';
import Icon from 'react-native-vector-icons/Ionicons'
import { StackRootParams } from '../../routes/Navigator';
import { StackScreenProps } from '@react-navigation/stack';
import { useReviewStore } from '../../store/reviews/useReviewsStore';
import { useForm, Controller } from "react-hook-form";

interface Props extends StackScreenProps<StackRootParams, 'AddReviewScreen'> { };

interface CommentForm  {
    comment : string
}
const AddReviewScreen = ({ route, navigation }: Props) => {

    const { addNewReview } = useReviewStore()
    const [valueStar, setValueStar] = useState<number>(0);
  
    const { productId } = route.params

    const { control, formState: { errors }, handleSubmit } = useForm({
        defaultValues: {} as CommentForm
    });

    const handleStarClick = (selectedStar: number) => {
        setValueStar(selectedStar === valueStar ? 0 : selectedStar);
    };
    
    const onSubmit = async (data : CommentForm )  => {
        
       await addNewReview({ comment : data.comment, stars: valueStar, ProductId: productId });
        navigation.navigate('ProductDetail', { id: productId })
    };

    return (
        <LayoutMain>
            <Layout style={styles.container}>
                <Layout style={styles.containerStars}>
                    {Array.from({ length: 5 }, (_, index) => {
                        let star = index + 1
                        return (
                            <Pressable
                                key={index}
                                onPress={() => handleStarClick(star)}
                            >
                                <Icon name={`${star <= valueStar ? 'star' : 'star-outline'}`} color={colors.yellow} size={30} />
                            </Pressable>
                        )
                    })}
                </Layout>
                {errors.comment?.type === 'required' && <Text style={styles.errorText}>Required field </Text>}
                {errors.comment?.type === 'maxLength' && <Text style={styles.errorText}>Error max length</Text>}
                <Controller
                    control={control}
                    render={({ field: { onBlur, onChange, value } }) => (
                        <Input
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            numberOfLines={15}
                            multiline={true}
                            style={styles.input}
                            textAlignVertical='top'
                        />
                    )}
                    rules={{
                        required: true,
                        maxLength: 300,
                        minLength: 5
                    }}
                    name='comment'

                />
       
                <Button
                    style={styles.btnAdd}
                    onPress={handleSubmit(onSubmit)}
                >
                    Add Review
                </Button>
            </Layout>
        </LayoutMain>

    )

};

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        paddingBottom: 40
    },
    containerStars: {
        flexDirection: 'row',
        columnGap: 10,
        width: '90%',
        marginHorizontal: '5%',
        marginBottom: 10
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

    },
    errorText: {
        textAlign: 'center',
        color: '#EF4444',
        marginVertical: 10
    }
})
export default AddReviewScreen