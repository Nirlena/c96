import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView, Platform, StatusBar, TouchableOpacity, Image, Alert } from 'react-native';
import { Header } from 'react-native-elements';
import db from './localdb.js'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import PhonicSoundButton from './PhonicSoundButton.js'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      text: '',
      chunks: [],
      phonicSounds: [],
    }
  }
  render() {
    return (
      <SafeAreaProvider>
        <Header
          backgroundColor='#9c47c2'
          centerComponent={{ text: 'Fonema', style: { color: '#000', fontSize: 20 } }} />
        <Image style={styles.imageIcon} source={require('./assets/boca.png')} />
        <TextInput
          onChangeText={text => { this.setState({ text: text }) }}
          value={this.state.text}
          style={styles.inputBox}
          placeholder={'Digite aqui'}/>
        
        <TouchableOpacity
          style={styles.goButton}
          onPress={()=>{
           var word = this.state.text.toLowerCase().trim()
          db[word] ? (
          this.setState({ chunks: db[word].chunks }),
          this.setState({phonicSounds: db[word].phones}) 
          )
          :
          Alert.alert('A palavra pesquisada não existe no banco de dados.')
          }}>
          <Text style={styles.buttonText}>
            Clique
          </Text>
        </TouchableOpacity>
        <Text style={styles.displayText}>
          {this.state.displayText}
        </Text>
        <View>
          {this.state.chunks.map((item, index)=>{
            return(
              <PhonicSoundButton 
              wordChunk={this.state.chunks[index]}
              soundChunk={this.state.phonicSounds[index]}
              buttonIndex={index} />
            )
          })}
        </View>
      </SafeAreaProvider>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  droidSafeArea: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  inputBox: {
    marginTop: 90,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    fontWeight: 'bold'
  },
  goButton: {
    width: '33%',
    height: 65,
    alignSelf: 'center',
    padding: 10,
    margin: 25,
    borderWidth: 4,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#03c99e'
  },
  buttonText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  displayText: {
    alignItems: 'center',
    fontSize: 30
    },
  imageIcon: {
    width: 256,
    height: 256,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    },
    chunkButton: {
    backgroundColor: 'red',
    width: '60%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10
    }
});
