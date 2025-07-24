import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  TextInput,
  TouchableOpacity
} from "react-native";
 
import CardUser from "../components/Users/CardUser";
 
import useFetchUser from "../hooks/useFetchUser";
import { useFocusEffect } from "@react-navigation/native";
 
const ShowUser = () => {
  const { usuarios, loading, fetchUsuarios, handleDelete, handleUpdate } = useFetchUser();
 
   // Estado para manejar la edición
  const [editingUser, setEditingUser] = useState(null);
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [correo, setCorreo] = useState("");

  // Se ejecuta cada vez que esta pantalla se enfoca
  useFocusEffect(
    useCallback(() => {
      fetchUsuarios();
    }, [])
  );

  // Función para comenzar a editar un usuario
  const handleEdit = (user) => {
    setEditingUser(user);
    setNombre(user.nombre);
    setEdad(user.edad.toString());
    setCorreo(user.correo);
  };

  // Función para guardar los cambios del usuario
  const handleSave = async () => {
    if (!nombre || !edad || !correo) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    await handleUpdate(editingUser.id, { nombre, edad: parseInt(edad), correo });
    setEditingUser(null); // Limpiar el estado de edición
    setNombre("");
    setEdad("");
    setCorreo("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Lista de Usuarios</Text>
      <Text style={styles.subtitle}>
        Consulta los usuarios registrados desde la API
      </Text>
 
      {!loading && (
        <Text style={styles.counterText}>
          Total de usuarios: {usuarios.length}
        </Text>
      )}
 
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#5C3D2E"
          style={{ marginTop: 20 }}
        />
      ) : (
        <FlatList
          data={usuarios}
          keyExtractor={(user) => user.id.toString()}
          renderItem={({ item }) => (
          <CardUser 
          user={item}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate} 
          />
      )}
          contentContainerStyle={styles.listContainer}
        />
      )}

      {editingUser && (
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Editar Usuario</Text>

          <TextInput
            style={styles.input}
            value={nombre}
            onChangeText={setNombre}
            placeholder="Nombre"
          />
          <TextInput
            style={styles.input}
            value={edad}
            onChangeText={setEdad}
            placeholder="Edad"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            value={correo}
            onChangeText={setCorreo}
            placeholder="Correo"
            keyboardType="email-address"
          />

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.buttonText}>Guardar Cambios</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAD8C0",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  listContainer: {
    paddingBottom: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#5C3D2E",
    textAlign: "center",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#5C3D2E",
    textAlign: "center",
    marginBottom: 10,
  },
  counterText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#3B2C24",
    textAlign: "center",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 20,
    marginVertical: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#5C3D2E",
    marginBottom: 5,
  },
  cardText: {
    fontSize: 16,
    color: "#3B2C24",
  },
  formContainer: {
    marginTop: 20,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 4,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#5C3D2E",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  saveButton: {
    backgroundColor: "#5C3D2E",
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
 
export default ShowUser;