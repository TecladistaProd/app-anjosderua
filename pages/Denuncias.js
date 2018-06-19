import React, { Component } from 'react'

import {
    StyleSheet,
    Text,
    View,
    TextInput
} from 'react-native'

import { Icon } from 'react-native-elements'

import Btn from '../components/Btn'

export default class Denuncias extends Component<{}> {
    constructor(props){
        super(props)
        this.state = {
            descricao: '',
            descricaoLocal: '',
            descricaoLocalGPS: '',
            error: null
        }
    }
    componentDidMount(){
        navigator.geolocation.getCurrentPosition(pos=>{
            let descricaoLocalGPS = `https://www.google.com/maps/place/${pos.coords.latitude},${pos.coords.longitude}`
            this.setState({
               descricaoLocalGPS
            })
        },err=>{
            this.setState({
                error: JSON.stringify(err)
            })
        })
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.teste}>Denuncias</Text>
                <View style={{justifyContent: 'flex-start', flex: 1, width: '100%', height:'97%', alignSelf: 'center'}}>
                    <Text style={{ fontSize: 16, marginBottom: 5 }}>Descrição</Text>
                    <TextInput style={styles.inputs}
                        value={this.state.descricao}
                        onChangeText={descricao => this.setState({descricao})}
                        multiline={true}
                        placeholder={'Digite a Descrição da denúncia'}
                    />
                    <View>
                        <Text style={{ fontSize: 16, marginBottom: 5 }}>Descrição do Local</Text>
                        <TextInput style={styles.inputs}
                            value={this.state.descricaoLocal}
                            onChangeText={descricaoLocal => this.setState({ descricaoLocal })}
                            multiline={true}
                            placeholder={'Digite o Local denunciado'}
                        />
                    </View>
                    <Btn
                        text='Denunciar'
                        style={{ backgroundColor: "#F65454", marginTop: 20 }}
                        onPress={() => {
                            if(this.state.descricao == '' || this.state.descricaoLocal == ''){
                                return alert('Digite a Descrição e Local')
                            }
                            fetch('http://soriano.esy.es/denuncias', {
                                method: 'POST',
                                body:JSON.stringify({
                                    delator: 'Anônimo',
                                    descricao: this.state.descricao,
                                    descricao_local: this.state.descricaoLocal + ' \r\n' + this.state.descricaoLocalGPS
                                })
                            }).then(e=> e.json()).then(e=> {
                                this.setState({descricao: '', descricaoLocal: ''})
                                alert(JSON.stringify(e, null, 4))
                            }).catch(e=> alert('Ocorreu um Problema Ligue a Internet e/ou Tente mais tarde'))
                        }}
                    />
                    <Text style={{ fontSize: 14, marginBottom: 5, color: '#aaa' }}>*Adicione Também a descrição do local</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#eee'
    },
    teste: {
        color: '#333',
        fontSize: 26,
    },
    inputs: {
        maxHeight: 100,
        textAlign: 'left',
        padding: 10,
        fontSize: 18,
        marginBottom: 10,
        width: '90%'
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
})
