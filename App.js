import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, Switch } from 'react-native';

export default function App() {
  const [todosLancamentos, setTodosLancamentos] = useState([]);
  const [novoLancamento, setNovoLancamento] = useState({
    data: '',
    tipo: '',
    nome: '',
    valor: '',
    obs: '',
    check: false,
  });

  const handleChange = (campo, valor) => {
    setNovoLancamento({
      ...novoLancamento,
      [campo]: valor,
    });
  };

  const handleSubmit = () => {
    setTodosLancamentos([...todosLancamentos, novoLancamento]);
    setNovoLancamento({
      data: '',
      tipo: '',
      nome: '',
      valor: '',
      obs: '',
      check: false,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleContainer}>Meus plantões</Text>
      <FlatList
        data={todosLancamentos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.lancamentoItem}>
            <Text>Data: {item.data}</Text>
            <Text>Tipo: {item.tipo}</Text>
            <Text>Nome: {item.nome}</Text>
            <Text>Valor: {item.valor}</Text>
            <Text>Obs: {item.obs}</Text>
            <Text>Check: {item.check ? 'Marcado' : 'Não marcado'}</Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Data"
          value={novoLancamento.data}
          onChangeText={(text) => handleChange('data', text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Tipo"
          value={novoLancamento.tipo}
          onChangeText={(text) => handleChange('tipo', text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Nome"
          value={novoLancamento.nome}
          onChangeText={(text) => handleChange('nome', text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Valor"
          value={novoLancamento.valor}
          onChangeText={(text) => handleChange('valor', text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Obs"
          value={novoLancamento.obs}
          onChangeText={(text) => handleChange('obs', text)}
          style={styles.input}
        />
      </View>
      <View style={styles.switchContainer}>
        <Text>Check</Text>
        <Switch
          value={novoLancamento.check}
          onValueChange={(value) => handleChange('check', value)}
        />
      </View>
      <Button title="Enviar" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 60,
  },
  titleContainer: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 8
  },
  inputContainer: {
    flexDirection: 'row', // Para criar uma fila horizontal
    alignItems: 'center', // Alinha os inputs verticalmente
    justifyContent: 'space-between', // Espaço igual entre os inputs
  },
  input: {
    flex: 1, // Para que os inputs ocupem espaço igual
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lancamentoItem: {
    backgroundColor: '#eee',
    padding: 10,
    marginVertical: 5,
  },
});
