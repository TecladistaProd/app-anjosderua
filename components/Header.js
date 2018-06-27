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
                <TouchableOpacity onPress={this.props.abrirModal} style={styles.linkPad} disabled={!this.props.nt}>
                    <View style={styles.notification}>
                        <Icon
                            name='bell'
                            type='entypo'
                            color={!!this.props.nt ? '#ffba22' : '#ccc'}
                        />
                    </View>
                </TouchableOpacity>
                <Text style={styles.fonte}>Anjos de Rua</Text>
                <TouchableOpacity style={styles.linkPad}
                    disabled={!!!this.props.token}
                    onPress={async()=>{
                       try{
                           await AsyncStorage.removeItem('@anjos_de_rua:token')
                           await AsyncStorage.removeItem('@anjos_de_rua:login')
                           await AsyncStorage.removeItem('@anjos_de_rua:ids')
                           await AsyncStorage.removeItem('@anjos_de_rua:msgs')
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


