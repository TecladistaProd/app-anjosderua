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
            error: null
        }
    }
    componentDidMount(){
        navigator.geolocation.getCurrentPosition(pos=>{
            let descricaoLocal = `Latitude: ${pos.coords.latitude}\nLongitude: ${pos.coords.longitude}`
            this.setState({
               descricaoLocal
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
                    {
                        !!this.state.error && 
                        <View>
                            <Text style={{ fontSize: 16, marginBottom: 5 }}>Descrição do Local ou Ative o GPS</Text>
                            <TextInput style={styles.inputs}
                                value={this.state.descricaoLocal}
                                onChangeText={descricaoLocal => this.setState({ descricaoLocal })}
                                multiline={true}
                                placeholder={'Digite o Local denunciado'}
                            />
                        </View>
                    }
                    <Btn
                        style={{ backgroundColor: "#ddd", marginTop: 15 }}
                        onPress={() => null}
                    >
                        <Icon
                            name='camera'
                            type='entypo'
                            color='#333'
                        />
                    </Btn>
                    <Btn
                        text='Denunciar'
                        style={{ backgroundColor: "#F65454", marginTop: 20 }}
                        onPress={() => {
                            if(this.state.descricao == ''){
                                return alert('Digite a Descrição')
                            }
                            fetch('http://10.0.2.2:80/anjos_server/denuncias', {
                                method: 'POST',
                                body:JSON.stringify({
                                    descricao: this.state.descricao,
                                    descricao_local: this.state.descricaoLocal
                                })
                            }).then(e=> e.json()).then(e=> {
                                this.setState({descricao: '', descricaoLocal: ''})
                            }).catch(e=> alert('Ocorreu um Problema Ligue a Internet e/ou Tente mais tarde'))
                        }}
                    />
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
