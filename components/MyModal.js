import React, { Component } from 'react'

import {
    Modal,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native'

export default class MyModal extends Component<{}>{
    constructor(props){
        super(props)
        this.state = {}
    }
    componentDidMount(){}
    render(){
        return(
            <Modal
                animatioType="fade"
                transparent={true}
                visible={this.props.visible} onRequestClose={() => this.props.close}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.boxContainer}>
                        <TouchableOpacity onPress={this.props.fecharModal} style={styles.modalFecha}>
                            <Text style={styles.modalFechaX}>X</Text>
                        </TouchableOpacity>
                        <Text style={{ textAlign:'center', fontSize: 16, color: '#333', fontWeight: 'bold'}}>Você tem Novas Mensagens</Text>
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    boxContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 20,
        minHeight: 20,
        width: '75%',
        maxHeight: '10%',
        justifyContent: 'center'
    },
    modalFecha: {
        alignSelf: 'flex-end',
        paddingHorizontal: 8,
        paddingVertical: 3,
        top: -5,
        right:-7
    },
    modalFechaX:{
        fontSize: 18,
        fontWeight: 'bold'
    }
})


