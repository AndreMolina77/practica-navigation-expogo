import {Text, TouchableOpacity, StyleSheet} from 'react-native'

const Buttons = ({text, action}) => {
    return(
        <TouchableOpacity
        onPress={action} style={styles.boton}
        >
            <Text style={styles.texto}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles=StyleSheet.create({
    boton:{
        padding: 10,
        backgroundColor: '#aa36d8ff',
        borderRadius: 14
    },
    texto:{
        fontSize:15,
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: 'bold'
    },
});
export default Buttons