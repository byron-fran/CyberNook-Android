import { View, Image, StyleSheet } from 'react-native'
import { Text } from '@ui-kitten/components'

const About = () => {

    return (
        <View style={styles.container}>
            <Text style={[styles.title, styles.titleH1]}>Why choose us </Text>
            <View style={styles.main}>
                {/* card about */}
                <View style={{ width : 150, }}>

                    <Image style={styles.image} source={require('../../assets/global.png')} />
                    <Text style={styles.title}>Global Shipping</Text>
                    <Text numberOfLines={3}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere libero iste consequuntur ratione est dolorem quasi qui voluptatum ad voluptas, optio itaque, tempore recusandae, non nobis deserunt ea minima quia.
                    </Text>
                </View>
                {/* card about */}
                <View style={{ width : 150, }}>

                    <Image style={styles.image} source={require('../../assets/save.png')} />
                    <Text style={styles.title}>Save money</Text>
                    <Text numberOfLines={3}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere libero iste consequuntur ratione est dolorem quasi qui voluptatum ad voluptas, optio itaque, tempore recusandae, non nobis deserunt ea minima quia.
                    </Text>
                </View>
                {/* card about */}
                <View style={{width : 150, }}>

                    <Image style={styles.image} source={require('../../assets/shipping.png')} />
                    <Text style={styles.title}>Fast Shipping</Text>
                    <Text numberOfLines={3}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere libero iste consequuntur ratione est dolorem quasi qui voluptatum ad voluptas, optio itaque, tempore recusandae, non nobis deserunt ea minima quia.
                    </Text>
                </View>
                {/* card about */}
                <View style={{ width : 150, }}>

                    <Image style={styles.image} source={require('../../assets/support.png')} />
                    <Text style={styles.title}>Support 24/7</Text>
                    <Text numberOfLines={3}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere libero iste consequuntur ratione est dolorem quasi qui voluptatum ad voluptas, optio itaque, tempore recusandae, non nobis deserunt ea minima quia.
                    </Text>
                </View>
            </View>
        </View>

    )

}
const styles = StyleSheet.create({

    container : {
        flex: 1 ,
        width : '90%', 
        marginHorizontal : '5%', 
        marginBottom : 50
    },
    titleH1 : {
        textAlign : 'center', 
        fontSize : 25, 
        marginVertical : 25
    },
    main : {
        flexDirection : 'row',
        flexWrap : 'wrap', 
        justifyContent : 'center', 
        gap : 20
    },
    image : {
        width: 100, 
        height: 100
    },
    title : {
        fontSize : 20,
        fontWeight : 'bold',
        color : '#000',
        marginVertical : 10
    }
})
export default About