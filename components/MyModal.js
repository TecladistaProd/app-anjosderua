import React, { Component } from 'react'

import {
    Modal,
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity
} from 'react-native'

export default class MyModal extends Component<{}>{
    constructor(props){
        super(props)
        this.state = {
            notifications: [
                {
                    titulo: 'Meu Titulo 1',
                    texto: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit...'
                },
                {
                    titulo: 'Meu Titulo 2',
                    texto: 'Libero architecto ea harum consectetur perferendis saepe...'
                },
                {
                    titulo: 'Meu Titulo 3',
                    texto: 'laudantium dolorem, voluptates nobis doloremque odit qui quibusdam...'
                },
                {
                    titulo: 'Meu Titulo 4',
                    texto: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit...'
                },
                {
                    titulo: 'Meu Titulo 5',
                    texto: 'Libero architecto ea harum consectetur perferendis saepe...'
                },
                {
                    titulo: 'Meu Titulo 6',
                    texto: 'laudantium dolorem, voluptates nobis doloremque odit qui quibusdam...'
                }
            ]
        }
    }

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
                        <FlatList
                            style={{alignSelf: 'center', marginLeft: -10}}
                            data={this.state.notifications}
                            renderItem={(item, key)=>{
                                item = item.item
                                return(
                                <View style={styles.notificationBox}
                                    key={key}
                                >
                                    <TouchableOpacity
                                        onPress={()=>{
                                            let arr = this.state.notifications
                                            arr.splice(key, 1)
                                            this.setState({notifications: arr})
                                        }}
                                    >
                                            <Text style={styles.notificationX}>
                                                X
                                            </Text>
                                    </TouchableOpacity>
                                    <Text style={styles.notificationTitle}>
                                        {item.titulo}
                                    </Text>
                                    <Text style={styles.notificationTexto}>
                                        {item.texto}
                                    </Text>
                                </View>
                                )
                            }}
                            keyExtractor={(item, key) => item + key}
                        />
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
        maxHeight: '70%',
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center'
    },
    modalFecha: {
        alignSelf: 'flex-end',
        paddingHorizontal: 8,
        paddingVertical: 3,
        top: -15,
        right:-7
    },
    modalFechaX:{
        fontSize: 18,
        fontWeight: 'bold',
    },
    notificationBox: {
        flex: 1,
        padding: 12,
        marginHorizontal: 20,
        marginVertical: 5,
        maxWidth: '95%',
        borderColor: '#777',
        borderRadius: 2, 
        borderWidth: 0.5,
        marginBottom: 5
    },
    notificationTitle: {
        fontSize: 18,
        color: '#333'
    },
    notificationTexto: {
        fontSize: 16,
        color: '#555'
    },
    notificationX: {
        alignSelf: 'flex-end',
        top: -2,
        left: 2,
        padding: 10
    }
})


