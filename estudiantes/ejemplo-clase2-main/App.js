import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Modal } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const App = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [carnet, setCarnet] = useState('');
  const [materiaFavorita, setMateriaFavorita] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const agregarAlumno = () => {
    const nuevoAlumno = {
      id: Math.random().toString(),
      nombre: nombre,
      carnet: carnet,
      materiaFavorita: materiaFavorita,
    };
    setAlumnos([...alumnos, nuevoAlumno]);
    setNombre('');
    setCarnet('');
    setMateriaFavorita('');
    setModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>Nombre: {item.nombre}</Text>
      <Text>Carnet: {item.carnet}</Text>
      <Text>Materia Favorita: {item.materiaFavorita}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Button title="Agregar Alumno" onPress={() => setModalVisible(true)} />
      <FlatList
        data={alumnos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>Registrar Alumno</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={nombre}
            onChangeText={setNombre}
          />
          <TextInput
            style={styles.input}
            placeholder="Carnet"
            value={carnet}
            onChangeText={setCarnet}
          />
          <TextInput
            style={styles.input}
            placeholder="Materia Favorita"
            value={materiaFavorita}
            onChangeText={setMateriaFavorita}
          />
          <Button title="Guardar" onPress={agregarAlumno} />
          <Button title="Cancelar" onPress={() => setModalVisible(false)} color="red" />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    borderRadius: 5,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default App;
