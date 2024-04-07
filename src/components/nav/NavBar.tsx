import { View, Text, StyleSheet, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { StackRootParams } from '../../routes/Navigator'
import { IndexPath, OverflowMenu, MenuItem } from '@ui-kitten/components'
import { colors } from '../../colors/colors'
import { useCategoryStore } from '../../store/category/useCategoryStore'
import { useMarksStore } from '../../store/marks/useMarksStore'
import { useEffect, useState } from 'react'
import { useProductsStore } from '../../store/products/useProducts'

const Navbar = () => {

    const { navigate } = useNavigation<StackNavigationProp<StackRootParams>>();
    const { categories } = useCategoryStore();
    const { getMarks, marks, isLoading } = useMarksStore();
    const { getProducts,    resetPage} = useProductsStore();

    const [selectedIndexCategory, setSelectedIndexCategory] = useState<IndexPath>(new IndexPath(0));
    const [selectedIndexMark, setSelectedIndexMark] = useState<IndexPath>(new IndexPath(0));

    const [visibleCategory, setVisibleCategory] = useState<boolean>(false);
    const [visibleMark, setVisibleMark] = useState<boolean>(false);

    const [category, setCategory] = useState<string>('');
    const [mark, setMark] = useState<string>('');


    useEffect(() => {
        getMarks()
    }, []);

    const onSelectCategory = (index: any) => {
        setVisibleCategory(false)
    };
    const onSelectMark = (index: any) => {
        setVisibleMark(false)
    };

    return (
        <View style={styles.navContainer}>
            <Pressable style={styles.navButton}>
                <Text
                    style={styles.navText}
                    onPress={() => {
                        setCategory('')
                        setMark('')
                        getProducts(1)
                        navigate('ProductsScreen', { page: 1, })
                        resetPage(1)
                    }}
                >All</Text>
            </Pressable>
            {/* Overflow menu categories */}
            <OverflowMenu

                visible={visibleCategory}
                anchor={() => (
                    <Pressable
                        style={styles.navButton}
                        onPress={() => setVisibleCategory(true)}
                    >
                        <Text style={styles.navText}>{category ? category : 'Select category'} </Text>
                    </Pressable>
                )}
                onSelect={onSelectCategory}
                onBackdropPress={() => setVisibleCategory(false)}
                selectedIndex={selectedIndexCategory}
            >
                {categories.map(category => (
                    <MenuItem
                        key={category.id}
                        title={category.name}
                        onPress={() => {
                            setCategory(category.name)
                            navigate('ProductsScreen',
                                {
                                    category: category.name && category.name,
                                    mark: mark && mark

                                }
                            )
                            resetPage(1)
                        }}
                    />
                ))}
            </OverflowMenu>
            {/* Overflow menu makrs */}
            <OverflowMenu

                visible={visibleMark}
                anchor={() => (
                    <Pressable
                        style={styles.navButton}
                        onPress={() => setVisibleMark(true)}
                    >
                        <Text style={styles.navText}>{mark ? mark : 'Select mark'} </Text>
                    </Pressable>
                )}
                onSelect={onSelectMark}
                onBackdropPress={() => setVisibleMark(false)}
                selectedIndex={selectedIndexMark}
            >
                {marks.map(mark => (
                    <MenuItem
                        key={mark.id}
                        title={mark.name}
                        onPress={() => {
                            resetPage(1)
                            setMark(mark.name)
                            navigate('ProductsScreen',
                                {
                                    mark: mark.name && mark.name,
                                    category: category && category
                                }
                            )
                        }}
                    />
                ))}
            </OverflowMenu>
            {/* Overflow menu makrs */}
        </View >
    )

};

const styles = StyleSheet.create({
    navContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: 10,
        width: '90%',
        marginHorizontal: '5%',
        marginTop: 10
    },
    navButton: {
        backgroundColor: colors.sky,
        padding: 7,
        borderRadius: 10,
        width: 115
    },
    navText: {
        textAlign: 'center',
        color: colors.blue
    }
})
export default Navbar