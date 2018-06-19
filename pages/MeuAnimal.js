import React, { Component } from 'react'

import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TextInput,
    AsyncStorage,
} from 'react-native'

import Btn from '../components/Btn'

export default class MeuAnimal extends Component<{}> {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            msg: '',
            msgs: new Set()    
        }
    }
    async componentDidMount(){  
        try {      
            let req, id = AsyncStorage.getItem('@anjos_de_rua:adocaoid') || ''
            this.setState({ id })
            if(this.state.id == ''){
                req = await fetch('http://soriano.esy.es/adocoes', {
                    headers:{
                        Authorization: this.props.token
                    },
                    method: 'GET'
                })
                req = await req.json()
                let login = JSON.parse(await AsyncStorage.getItem('@anjos_de_rua:login')).login
                req.data.forEach(async adocao=>{
                    if(adocao.associado.email == login){
                        await AsyncStorage.setItem('@anjos_de_rua:adocaoid', adocao.id)
                        this.setState({id: adocao.id})
                    }
                })
            }
            fetch('http://soriano.esy.es/mensagens/adocao/'+this.state.id, {
                headers: {
                    Authorization: this.props.token
                }
            }).then(json => json.json())
            .then(r=>{
                alert(JSON.stringify({ r, Authorization: this.props.token, url: 'http://soriano.esy.es/mensagens/adocao/'+this.state.id}, null, 4))
            })
            // alert('http://soriano.esy.es/mensagens/adocao/' + this.state.id)
        } catch (err) {
            //
        }
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
                        onPress={() =>{
                            this.setState({
                                msgs: new Set([...this.state.msgs, { tp:2, msg: this.state.msg } ]),
                                    msg: ''
                                })
                            setTimeout(()=>{
                                this.setState({ msgs: new Set([...this.state.msgs, { tp:1, msg: 'Resposta da ong' }]) })
                                }, 1200)
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
