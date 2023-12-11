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

  const [filtroInativos, setFiltroInativos] = useState(false);

  const itensFiltrados = todosLancamentos.filter((item) => {
    const ativo = filtroAtivos ? item.check : true;
    const inativo = filtroInativos ? !item.check : true;
    
    return ativo && inativo;
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

  const handleSwitchChange = (index, value) => {
    const updatedLancamentos = [...todosLancamentos];
    updatedLancamentos[index].check = value;
    setTodosLancamentos(updatedLancamentos);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleContainer}>Meus plantões</Text>
      
      <View style={styles.switchContainerTop}>
        <Switch
          value={filtroInativos}
          onValueChange={(value) => setFiltroInativos(value)}
        />
        <Text>Caloreiros</Text>
      </View>

      <View style={styles.headerContainer}>
        <Text style={styles.label}>Data</Text>
        <Text style={styles.label}>Tipo</Text>
        <Text style={styles.label}>Nome</Text>
        <Text style={styles.label}>Valor</Text>
        <Text style={styles.label}>Obs</Text>
        <Text style={styles.label}>Pago?</Text>
      </View>
     
      <FlatList
        data={itensFiltrados}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.lancamentoItem}>
            <Text style={styles.label}>{item.data}</Text>
            <Text style={styles.label}>{item.tipo}</Text>
            <Text style={styles.label}>{item.nome}</Text>
            <Text style={styles.label}>{item.valor}</Text>
            <Text style={styles.label}>{item.obs}</Text>

            <View style={styles.switchContainer}>
              <Switch
                value={item.check}
                onValueChange={(value) => handleSwitchChange(index, value)}
              />
            </View>
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
  switchContainerTop: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  lancamentoItem: {
    backgroundColor: '#eee',
    padding: 10,
    marginVertical: 5,
  },
  lancamentoItem: {
    flexDirection: 'row', // Exibir os itens em uma linha
    justifyContent: 'space-between', // Espaço igual entre os itens
    alignItems: 'center', // Alinhar os itens verticalmente
    backgroundColor: '#eee',
    padding: 10,
    marginVertical: 5,
  },
  label: {
    flex: 1, // Faz com que os itens ocupem espaço igual
    marginRight: 5, // Adiciona margem direita para separar os itens
  },
  lancamentoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
    marginVertical: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#eee',
    padding: 10,
    marginBottom: 5,
  },
  label: {
    flex: 1, // Faz com que os itens ocupem espaço igual
    marginRight: 5, // Adiciona margem direita para separar os itens
    textAlign: 'center',
  },
});
