
// adb kill-server
// adb start-server

import React, {Component} from 'react';
import {
  StyleSheet, 
  Text, 
  View, 
  Image,
  ImageBackground, 
  TextInput, 
  Button,
  ActivityIndicator } from 'react-native';

import axios from 'axios';

export default class Log extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      login: "  ",
      senha: " ",
      loading: false,
      user : [],
    };
  }

  onChange(key, value) {
    this.setState({
      [key] : value,
    })
  }

  onPress() {

    const dados = {
      login: this.state.login,
      senha: this.state.senha,
    };

    this.setState({ loading : true });

    setTimeout(() => {

      axios({ 
          method: 'post', 
          url: 'http://www.gileduardo.com.br/react/api_charadas/rest.php/auth',
          data: dados,
          headers:{
            "Content-Type": "application/json" 
          }, 
        }).then(response => {

          if(response.data.id < 0) {
            alert(response.data.nome)  
            this.setState({
              login : "",
              senha : "",
            })  
          }
          else {
            alert('[OK] Autenticação efetuada com sucesso!')   
          }
          
          this.setState({ loading : false });

        }).catch(error => {
          alert("[ERROR] Houve um problema ao acessar a API!");
          this.setState({ loading : false });
        });
        
    }, 1000);
  }

  

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground 
          source={ require('../img/code-editoren-t.jpg') } 
          style={{width: '100%', height: '100%'}}>
          <Button style={{alignItems: 'center'}}
            onPress={()=>{this.props.navigation.navigate("Main");}}
            title="Toque para entrar"
            color="#000"
          />
          <View>
          <Image style={{marginTop: 185, marginLeft:55  }}
           source={require('../img/google-code-xxl.png')}/>
          </View>     
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    alignItems: 'center',
    
  },
  text : {
    fontSize: 36, 
    fontWeight: '900', 
    color: '#FAFAFA', 
    paddingLeft: 10,
  },
  footer: {
    position: 'absolute', 
    bottom: 0,
    height: 138,
    width: '96%',
    margin: '2%',
    marginBottom: '70%',
    borderWidth: 3,
    borderColor: '#000',
    shadowOpacity: 1, 
    shadowColor: 'black', 
    shadowOffset: {
            width: 0,
            height: -10
    },
    elevation: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  input: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#000',
    margin: 2,
    padding: 2,
    color: '#000'
  },
});