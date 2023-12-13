import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, Switch, TouchableOpacity, Alert, Modal } from 'react-native';
import DropDownMenu from 'react-native-dropdown-menu';
import DateTimePicker from '@react-native-community/datetimepicker';

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

  const [observacoesModalVisible, setObservacoesModalVisible] = useState(false);

  const [observacoesTemp, setObservacoesTemp] = useState('');

  const [observacoesIndex, setObservacoesIndex] = useState(null); // Índice do item com observações
  
  const [listaLancamentos, setListaLancamentos] = useState([]);

  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const itensFiltrados = todosLancamentos.filter((item) => {
    const inativo = filtroInativos ? !item.check : true;
    
    return inativo;
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

  const handleRemoveItem = (index) => {
    const updatedLancamentos = [...todosLancamentos];
    updatedLancamentos.splice(index, 1); // Remove o item do array
    setTodosLancamentos(updatedLancamentos);
  };

  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleLongPress = (index) => {
    // Quando um item é pressionado e mantido, exibe o menu de contexto nativo
    Alert.alert(
      'Opções',
      'Escolha uma opção:',
      [
        {
          text: 'Observações',
          onPress: () => handleAddObservations(index),
        },
        {
          text: 'Remover',
          onPress: () => handleRemoveItem(index),
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ],
    );
  };

  const handleAddObservations = (index) => {
    setObservacoesIndex(index); // Armazena o índice do item com observações
    setObservacoesTemp(itensFiltrados[index]?.obs || ''); // Carrega as observações existentes
    setObservacoesModalVisible(true);
  };

  const saveObservacoes = () => {
    if (observacoesIndex !== null) {
      const updatedLancamentos = [...todosLancamentos];
      updatedLancamentos[observacoesIndex].obs = observacoesTemp;
      setTodosLancamentos(updatedLancamentos);
    }
    setObservacoesTemp('');
    setObservacoesModalVisible(false);
  };

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };
  
  const handleDateChange = (event, selectedDate) => {
    setDatePickerVisible(false);
  
    if (selectedDate) {
      handleChange('data', selectedDate);
    }
  };
  
  const formatDate = (date) => {
    if (!date) return '';
    const formattedDate = new Date(date).toLocaleDateString();
    return formattedDate;
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.titleContainer}>Meus plantões</Text>
      
      <View style={styles.switchContainerTop}>
        <Switch
          value={filtroInativos}
          onValueChange={(value) => setFiltroInativos(value)}
        />
        <Text>Mostrar só os caloteiros? </Text>
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
          <TouchableOpacity onLongPress={() => handleLongPress(index)}>
            <View style={styles.lancamentoItem}>
              <Text style={styles.label}>{item.data}</Text>
              <Text style={styles.label}>{item.tipo}</Text>
              <Text style={styles.label}>{item.nome}</Text>
              <Text style={styles.label}>{item.valor}</Text>
              <Text>{item.obs ? <Button title="Obs" onPress={() => handleAddObservations(index)} /> : ''}</Text>

              <View style={styles.switchContainer}>
                <Switch
                  value={item.check}
                  onValueChange={(value) => handleSwitchChange(index, value)}
                />
              </View>

            </View>
          </TouchableOpacity>
        )}
      />

      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={showDatePicker}>
          <View style={styles.datePickerContainer}>
            <Text>Data: {formatDate(novoLancamento.data)}</Text>
          </View>
        </TouchableOpacity>

        {isDatePickerVisible && (
          <DateTimePicker
            value={novoLancamento.data || new Date()} // Defina a data atual ou a data existente
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
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

      <View style={{ flexDirection: 'row-reverse', marginLeft: 20 }}>
        <Button  title="Enviar" onPress={handleSubmit} />
      </View>

      {/* Modal de Observações */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={observacoesModalVisible}
        onRequestClose={() => {
          setObservacoesModalVisible(false);
        }}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, elevation: 5 }}>
            <Text>Observações</Text>
            <TextInput
              placeholder="Observações"
              value={observacoesTemp}
              onChangeText={(text) => setObservacoesTemp(text)}
              style={styles.input}
            />
            <Button title="Salvar" onPress={saveObservacoes} />
            <TouchableOpacity onPress={() => setObservacoesModalVisible(false)}>
              <Text>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 60,
    marginBottom: 40
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
  datePickerContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },  
});
