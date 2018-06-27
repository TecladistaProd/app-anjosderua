import React, { Component } from 'react'

import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TextInput,
    ToastAndroid,
    AsyncStorage,
} from 'react-native'

import Btn from '../components/Btn'

export default class MeuAnimal extends Component<{}> {
    constructor(props) {
        super(props)
        this.state = {
            ids: null,
            msg: '',
            msgs: new Set()   
        }
    }
    async recebeMensagem(n){
        fetch(`http://soriano.esy.es/mensagens/adocao/${this.state.ids.adocao}`, {
            headers: {
                Authorization: this.props.token
            },
            method: 'GET'
        }).then(e => e.json()).then(e => { 
            e.data.sort((a, b) => {
                if (+a.id < +b.id)
                    return -1
                else
                    return 1
            })
            let x = new Set()
            e.data.forEach(item => {
                x.add({
                    msg: item.mensagem,
                    tp: item.remetente == 'admin' ? 1 : 2
                })
            })
            fetch(`http://soriano.esy.es/mensagens/mensagens/visualizadas`, {
                headers:{
                    Authorization: this.props.token
                },
                method: 'PUT',
                body: JSON.stringify({
                    'id_adocao': this.state.ids.adocao,
                    'remetenteAdmin': 1
                })
            })
            this.setState({ msgs: x })
        })
        let ml = parseInt(await AsyncStorage.getItem('@anjos_de_rua:msgs'))
        if (!ml || ml < [...this.state.msgs].length) {
            await AsyncStorage.setItem('@anjos_de_rua:msgs', JSON.stringify([...this.state.msgs].length))
            if (!n) {
                this.props.novoNot(true)
            }
        }
    }
    async componentDidMount(){  
        try {      
            let ids = await AsyncStorage.getItem('@anjos_de_rua:ids') || ''
            if(ids != ''){
                ids = JSON.parse(ids)
                this.setState({ ids })
            }
            if (!!!this.state.ids){
                let body = await AsyncStorage.getItem('@anjos_de_rua:login')
                let dados = await fetch('http://soriano.esy.es/authentication', {
                    method: 'POST',
                    body
                })
                dados = await dados.json()
                let obj = await dados.data
                if (!(obj.response == 401)) {
                    await AsyncStorage.setItem('@anjos_de_rua:ids', JSON.stringify({ associado: obj.id_associado, adocao: obj.ids_adocoes[0].id }))
                    this.setState({ ids: { associado: obj.id_associado, adocao: obj.ids_adocoes[0].id }})
                } 
            }
            this.recebeMensagem()
            this.setState({
                interval: setInterval(()=> this.recebeMensagem(), 3000)
            })
        } catch (err) {
            ToastAndroid.showWithGravity(
                'Ocorreu um Problema',
                ToastAndroid.LONG,
                ToastAndroid.CENTER
            )
        }
    }
    componentWillUnmount(){
        clearInterval(this.state.interval)
    }
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.titulo}>Conversar com ONG</Text>
                </View>
                <View style={styles.body}>
                    <FlatList
                        data={[...this.state.msgs].reverse()}
                        style={{ backgroundColor: '#eee'}}
                        renderItem={({item, key})=>{
                            if (item.tp == 1)
                                return <Text key={key} style={{ margin:5, padding: 17, borderRadius: 7, backgroundColor: '#33cfaa', color: '#555', fontSize: 18 }}>ONG: {item.msg}</Text>
                            else
                                return <Text key={key} style={{ margin:5, padding: 17, borderRadius: 7, backgroundColor: '#33df7a', color: '#333', fontSize: 18, alignSelf: 'flex-end' }}>Usuário: {item.msg}</Text>
                        }}
                        keyExtractor={(item, key)=> item + key}
                        inverted
                    />
                    <Text style={{ fontSize: 18, marginBottom: 5, marginTop: 7 }}>Digite a mensagem</Text>
                    <TextInput style={styles.inputs}
                        value={this.state.msg}
                        onChangeText={msg => this.setState({ msg })}
                        multiline={true}
                        placeholder={'Mensagem...'}
                    />
                    <Btn
                        style={{ backgroundColor: "#33cf3a", marginTop: 16 }}
                        onPress={async () =>{
                            try{
                                let login = JSON.parse(await AsyncStorage.getItem('@anjos_de_rua:login')).login
                                fetch('http://soriano.esy.es/mensagens', {
                                    headers: {
                                        Authorization: this.props.token,
                                        'Content-Type': 'application/json'
                                    },
                                    method: 'POST',
                                    body: JSON.stringify({
                                        id_adocao:	this.state.ids.adocao,
                                        mensagem: this.state.msg,
                                        remetente: login
                                    })
                                }).then(()=> {
                                    this.recebeMensagem(1)
                                    this.setState({ msg: '' })
                                })
                            } catch(err) {
                                ToastAndroid.showWithGravity(
                                    'Ocorreu um Problema tente mais tarde',
                                    ToastAndroid.LONG,
                                    ToastAndroid.CENTER
                                )
                                this.setState({ msg: '' })
                            }
                        }}
                        text='Enviar'
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
        justifyContent: 'center',
        backgroundColor: '#eee'
    },
    body: {
        flex: 1,
        width: '100%'
    },
    titulo: {
        color: '#333',
        fontSize: 26,
    },
})
