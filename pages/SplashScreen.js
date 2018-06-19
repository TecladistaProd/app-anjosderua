import React, { Component } from 'react'

import {
    StyleSheet,
    Text,
    View,
    ToastAndroid,
    ActivityIndicator
} from 'react-native'

export default class SplashScreen extends Component<{}> {
    constructor(props) {
        super(props)
    }
    componentDidMount(){
        ToastAndroid.showWithGravity(
            'Desenvolvido por @FatecTaquaritinga',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleDiv}>
                    <Text style={styles.teste}>Anjos de Rua</Text>
                    <ActivityIndicator size={120} color="#ffaa00" />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#66aaaa'
    },
    teste: {
        color: '#fff',
        fontSize: 30,
    },
    titleDiv: {
        flex: 1,
        justifyContent: 'center'
    },
    subtitle: {
        color: '#f1f2f6',
        fontSize: 20,
        fontFamily: 'notoserif',
    }
})
