import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const App = () => {
  const [nombreCliente, setNombreCliente] = useState('');
  const [fechaReserva, setFechaReserva] = useState(new Date());
  const [clientes, setClientes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setFechaReserva(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const agregarCliente = () => {
    const nuevoCliente = { id: clientes.length + 1, nombre: nombreCliente, fechaReserva: fechaReserva };
    setClientes([...clientes, nuevoCliente]);
    setNombreCliente('');
    setFechaReserva(new Date());
    setModalVisible(false);
  };

  const eliminarCliente = (id) => {
    setClientes(clientes.filter((cliente) => cliente.id !== id));
  };

  return (
    <View style={styles.contenedor}>
      <Button title="Agregar Cliente" onPress={() => setModalVisible(true)} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.contenidoModal}>
          <View style={styles.modal}>
            <TextInput
              style={styles.input}
              placeholder="Nombre del Cliente"
              value={nombreCliente}
              onChangeText={setNombreCliente}
            />
            <TouchableOpacity onPress={showDatepicker}><Text>Seleccionar Fecha de Reserva</Text></TouchableOpacity>
            <Text>Seleccionada: {fechaReserva.toLocaleString()}</Text>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={false}
                onChange={onChange}
                locale='es-ES'
              />
            )}
            <Button title="Agregar Cliente" onPress={agregarCliente} />
            <Button
              title="Cancelar"
              onPress={() => setModalVisible(false)}
              color="red"
            />
          </View>
        </View>
      </Modal>
      <FlatList
        data={clientes}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemCliente}
            onPress={() => eliminarCliente(item.id)}
          >
            <Text style={styles.nombreCliente}>{item.id}</Text>
            <Text style={styles.nombreCliente}>{item.nombre}</Text>
            <Text style={styles.fechaCliente}>
              Fecha de Reserva: {item.fechaReserva.toDateString()}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#001222',
    padding: 20,
  },
  contenidoModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  itemCliente: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    marginTop: 5
  },
  nombreCliente: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  fechaCliente: {
    fontSize: 16,
  },
});

export default App;
