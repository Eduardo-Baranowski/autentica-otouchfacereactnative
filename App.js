import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import TouchID from 'react-native-touch-id';

export default function App() {
  const [supported, setSupported] = useState(null);
  const [nome, setNome] = useState('Anômimo');

  useEffect(() => {
    TouchID.isSupported()
      .then(sucesso => {
        setSupported(true);
        console.log('Touch ID habilitado!');
      })
      .catch(error => {
        console.log('Errou touch: ' + error);
        alert('Touch ID não suportado/habilitado');
      });
  }, []);
  function handleLogin() {
    const configs = {
      title: 'Autenticação Touch ID',
      color: '#FF0000',
      sensorErrorDescription: 'Touch ID invalido!',
    };
    TouchID.authenticate('Login App youtube', configs)
      .then(sucesso => {
        console.log('seja bem vindo!');
        setNome('Olá programador!');
      })
      .catch(error => {
        console.log('Falha na autenticação: ' + error);
      });
  }
  return (
    <View style={styles.container}>
      <TouchableHighlight style={styles.btn} onPress={handleLogin}>
        <Text style={{color: '#fff', fontWeight: 'bold'}}>Entrar</Text>
      </TouchableHighlight>
      <Text style={{fontSize: 30, fontWeight: 'bold'}}>{nome}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    borderRadius: 3,
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#0391d7',
  },
});
