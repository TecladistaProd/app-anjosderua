// imported from modules
import React, { Component } from 'react'

import {
  StyleSheet,
  View,
  AsyncStorage
} from 'react-native'

import {
  NativeRouter,
  Route
} from 'react-router-native'

// imported from personal archives
  
  //imported from components
    import Header from './components/Header'
    import Footer from './components/Footer'
    import MyModal from './components/MyModal'
  
  // imported from pages
    import SplashScreen from './pages/SplashScreen'
    import Home from './pages/Home'
    import MeuAnimal from './pages/MeuAnimal'
    import Denuncias from './pages/Denuncias'

export default class App extends Component<{}> {
  constructor(props){
    super(props)
    this.state = {
      splash: true,
      pagina: '',
      token: null,
      modalVisible: false,
      not: false
    }
  }

  async componentDidMount(){
    try {
      this.setState({ token: await AsyncStorage.getItem('@anjos_de_rua:token')})
      if(!!!this.state.token)
        return setTimeout(() => this.setState({ splash: false }), 500)
      else{
        let body = await AsyncStorage.getItem('@anjos_de_rua:login')
        let dados = await fetch('http://soriano.esy.es/authentication', {
          method: 'POST',
          body
        })
        dados = await dados.json()
        let obj = await dados.data
        if (obj.response == 401) {
          this.setState({ splash: false, token:null })
        }
        let token = obj.token
        await AsyncStorage.setItem('@anjos_de_rua:token', token)
        await AsyncStorage.setItem('@anjos_de_rua:ids', JSON.stringify({ associado: obj.id_associado, adocao: obj.ids_adocoes[0].id }))
        this.setState({token})
        setTimeout(() => this.setState({ splash: false }),500)
      } 
    } catch (err) {
      this.setState({ splash: false, token: null })
     }
  }

  componentWillUnmount() {
    this.setState({ modalVisible: false })
  }

  render() {
    if(this.state.splash == true)
      return <SplashScreen/>
    return (
      <NativeRouter>
        <View style={styles.container}>
          <MyModal visible={this.state.modalVisible} fecharModal={() => this.setState({ modalVisible: false, not: false})}/>
          <Header
            abrirModal={()=> this.setState({modalVisible: true})}  
            token={this.state.token}
            exit={()=> this.setState({token: null})}
            nt={this.state.not}
          />
          <View style={{flex:1, padding:3, justifyContent:'center'}}>
            {!!!this.state.token &&
            <Route exact path='/'
              render={() => <Home enter={async() =>{
                  let token = await AsyncStorage.getItem('@anjos_de_rua:token')
                  this.setState({ token: token })
                }}/>}
            />
            }
            {!!this.state.token &&
              <Route exact path='/' render={()=>
                <MeuAnimal token={this.state.token}
                  novoNot={not=> this.setState({not})}
                />
              }/>
            }
            <Route path='/denuncias' component={Denuncias}/>
          </View>
          <Footer
            pagina={this.state.pagina}
            home={() => this.setState({ pagina: '' })}
            acompanhamento={() => this.setState({ pagina: '' })}
            denuncias={() => this.setState({ pagina: 'Denuncias' })}
            token={this.state.token}
          />
        </View>
      </NativeRouter>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee'
  }
})
