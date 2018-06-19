import React, { Component } from 'react'

import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    AsyncStorage
} from 'react-native'

import { Icon } from 'react-native-elements'

import {
    Link
} from 'react-router-native'

export default class Header extends Component<{}> {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.props.abrirModal} style={styles.linkPad}>
                    <View style={styles.notification}>
                        <Icon
                            name='bell'
                            type='entypo'
                            color='#ffba22'
                        />
                        <Text style={styles.notificationText}>3</Text>
                    </View>
                </TouchableOpacity>
                <Text style={styles.fonte}>Anjos de Rua</Text>
                <TouchableOpacity style={styles.linkPad}
                    disabled={!!!this.props.token}
                    onPress={async()=>{
                       try{
                           await AsyncStorage.removeItem('@anjos_de_rua:token')
                           await AsyncStorage.removeItem('@anjos_de_rua:login')
                           await AsyncStorage.removeItem('@anjos_de_rua:adocaoid')
                           this.props.exit()
                       }catch(err){} 
                    }}
                >
                    <Icon
                        name='power-off'
                        type='font-awesome'
                        color={!!this.props.token ? '#ff3333' : '#ccc'}
                />
                </TouchableOpacity>
            </View> 
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        paddingVertical: 2,
        paddingHorizontal: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff'
    },
    fonte: {
        fontSize: 20
    },
    notification: { 
        flexDirection: 'row',
        padding: 0 
    },
    notificationText: { 
        top:13,
        fontSize: 10,
        fontWeight: '400',
        color: '#ff1223' 
    },
    linkPad: {
        padding: 7
    }
})


