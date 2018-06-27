// imported from modules
import React, { Component } from 'react'

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    ToastAndroid,
    AsyncStorage,
    ActivityIndicator
} from 'react-native'

import Btn from '../components/Btn'
import { Icon } from 'react-native-elements'

export default class Home extends Component<{}> {
    constructor(props) {
        super(props)
        this.state = {
            login: '',
            senha: '',
            mostraSenha: false,
            logando: false
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.cabecalho}>
                    <Text style={styles.fontPadrao}>Adote esta Causa</Text>
                    <Text>{this.state.token}</Text>
                </View>
                { !this.state.logando &&
                <View style={styles.corpo}>
                    <Text style={{ fontSize: 16, marginBottom: 5 }}>Login:</Text>
                    <TextInput style={styles.inputs} placeholder="Digite o Login"
                        onChangeText={login=> this.setState({login})}
                        value={this.state.login}
                        autoCapitalize="none"
                    />
                    <View style={{ flexDirection: 'row', width: '90%', alignItems: 'center', justifyContent: 'center'}}>
                        <View style={{flex:1, width: '100%'}}>
                            <Text style={{fontSize:16, marginBottom:5}}>Senha:</Text>
                            <TextInput style={styles.inputs} placeholder="Digite a Senha" secureTextEntry={!this.state.mostraSenha}
                                onChangeText={senha => this.setState({ senha })}
                                value={this.state.senha}
                            />
                        </View>
                        <View style={{marginLeft: -40}}>
                            <TouchableOpacity 
                                onPress={() => this.setState({mostraSenha: !this.state.mostraSenha})}
                            >
                                <Icon
                                    name={this.state.mostraSenha === true ? 'eye-with-line' : 'eye'}
                                    type='entypo'
                                    color={this.state.mostraSenha === true ? '#555' : '#aaa'}
                                    size={20}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Btn style={styles.loginBtn} text='Entrar'
                        onPress={async () =>{
                            this.setState({logando: true})
                            let url = 'http://soriano.esy.es/authentication',
                                body = JSON.stringify({login: this.state.login, password: this.state.senha})
                            fetch(url, {
                                method: 'POST',
                                body
                            })
                                .then(res=> res.json())
                                .then(async res=>{
                                    
                                    let obj = res.data
                                    if(obj.response == 401){
                                        this.setState({ logando: false, mostraSenha: false, login: '', senha: '' })
                                        return ToastAndroid.showWithGravity(
                                            'Dados Inválidos',
                                            ToastAndroid.LONG,
                                            ToastAndroid.CENTER
                                        )
                                    }
                                    try{
                                        await AsyncStorage.setItem('@anjos_de_rua:login', body)
                                        this.setState({ logando: false, mostraSenha: false, login: '', senha: '' })
                                        let token = obj.token
                                        await AsyncStorage.setItem('@anjos_de_rua:token', token)
                                        await AsyncStorage.setItem('@anjos_de_rua:ids', JSON.stringify({associado: obj.id_associado, adocao: obj.ids_adocoes[0].id}))
                                        this.props.enter()
                                    }catch(err){}
                                })  
                                .catch(err =>{
                                    this.setState({logando: false, mostraSenha: false})
                                    ToastAndroid.showWithGravity(
                                        'Problema com a Conexão',
                                        ToastAndroid.LONG,
                                        ToastAndroid.CENTER
                                    )
                                })
                        }}
                    />
                    <Btn style={{backgroundColor: "#ffdf63", marginBottom: 10}} text='Limpar Campos'
                        onPress={()=>{
                            this.setState({senha: '', login: ''})
                        }}
                    />
                </View>}
                {this.state.logando && <ActivityIndicator size={120} color="#ffaa00" />}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eee'
    },
    cabecalho: {
        height:'30%'
    },
    corpo: {
        flex: 1,
        width: '100%',
        alignContent: 'center',
    },
    fontPadrao:{
        color: '#333',
        fontSize: 26
    },
    inputs: {
        padding:10,
        fontSize: 18,
        marginBottom: 10,
        width: '90%'
    },
    btn:{
        flex:1,
        padding:12,
        borderRadius: 10,
        marginBottom: 10,
        width: '90%'
    },
    loginBtn:{
        backgroundColor: '#53ee63',
        marginBottom: 10,
    }
})
