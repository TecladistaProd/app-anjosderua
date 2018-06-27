import React, { Component } from 'react'

import {
    StyleSheet,
    TouchableOpacity,
    Linking,
    View
} from 'react-native'

import { Icon } from 'react-native-elements'

import {
    Link
} from 'react-router-native'

export default class Footer extends Component<{}> {
    constructor(props) {
        super(props)
        this.state = {
            color: '#ccc'
        }
    }
    render() {
        return (
            <View style={styles.container}>
                { !!!this.props.token && 
                <Link to='/' onPress={this.props.home} style={styles.linkPad} disabled={this.props.pagina === 'Home'}>
                    <Icon
                        name='sign-in'
                        type='font-awesome'
                        color={(this.props.pagina === '' && this.state.color) || '#1E90FF'}
                    />
                </Link>
                }
                { !!this.props.token && 
                <Link to='/' onPress={this.props.acompanhamento} style={styles.linkPad} disabled={this.props.pagina === 'Acompanhamento'}>
                    <Icon
                        name='baidu'
                        type='entypo'
                        color={(this.props.pagina === '' && this.state.color) || '#cd853f'}
                    />
                </Link>
                }
                <Link to='/denuncias' onPress={this.props.denuncias} style={styles.linkPad} disabled={this.props.pagina === 'Denuncias'}>
                    <Icon
                        name='alert'
                        type='foundation'
                        color={(this.props.pagina === 'Denuncias' && this.state.color) || '#FFaf00'}
                    />
                </Link>
                <TouchableOpacity style={styles.linkPad} onPress={()=>{
                    Linking.openURL('https://pagseguro.uol.com.br/checkout/v2/donation.html?currency=BRL&receiverEmail=anjosderuataquaritinga@hotmail.com&iot=button')
                }}>
                    <Icon
                        name='attach-money'
                        type='material'
                        size={26}
                        color='#228b22'
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
        justifyContent: 'space-around',
        backgroundColor: '#fff'
    },
    fonte: {
        fontSize: 20
    },
    linkPad: {
        padding: 7
    }
})


