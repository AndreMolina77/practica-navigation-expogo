import { useState, useEffect } from "react";
import { Alert } from "react-native";
 
const useFetchUser = () => {
  // Estados del formulario
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [correo, setCorreo] = useState("");
 
  // Estados para la lista de usuarios
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
 
  // Obtener usuarios desde la API
  const fetchUsuarios = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://retoolapi.dev/zZhXYF/movil");
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    } finally {
      setLoading(false);
    }
  };
 
  // Guardar nuevo usuario en la API
  const handleGuardar = async () => {
    if (!nombre || !edad || !correo) {
      Alert.alert("Error", "Por favor, completa todos los campos");
      return;
    }
 
    try {
      const response = await fetch("https://retoolapi.dev/zZhXYF/movil", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          edad: parseInt(edad),
          correo,
        }),
      });
 
      if (response.ok) {
        Alert.alert("Éxito", "Usuario guardado correctamente");
        setNombre("");
        setEdad("");
        setCorreo("");
        fetchUsuarios(); // Actualizar lista
      } else {
        Alert.alert("Error", "No se pudo guardar el usuario");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Ocurrió un error al enviar los datos");
    }
  };

  //Eliminar el Usuario
  const handleDelete = async (id) => {
    try {
      // Verificar si el usuario existe antes de intentar eliminarlo
      const checkResponse = await fetch(`https://retoolapi.dev/zZhXYF/movil/${id}`);
  
      if (!checkResponse.ok) {
        Alert.alert("Error", "El usuario ya no existe o fue eliminado.");
        return;
      }
  
      // Intentar eliminar
      const response = await fetch(`https://retoolapi.dev/zZhXYF/movil/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        Alert.alert("Éxito", "Usuario eliminado correctamente");
        fetchUsuarios(); // Recargar lista actualizada
      } else {
        const errorText = await response.text();
        console.error('❌ Error al eliminar el item:', response.status, errorText);
        Alert.alert("Error", "No se pudo eliminar el usuario.");
      }
    } catch (error) {
      console.error('❗ Error inesperado al eliminar:', error.message);
      Alert.alert("Error", "Ocurrió un error al eliminar el usuario.");
    }
  };
  
  
  

  //Editar el usuario
  const handleUpdate = async (id, updatedData) => {
    const { nombre, edad, correo } = updatedData;
  
    if (!nombre || !edad || !correo) {
      Alert.alert("Error", "Por favor, completa todos los campos");
      return;
    }
  
    try {
      const response = await fetch(`https://retoolapi.dev/zZhXYF/movil/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          edad: parseInt(edad),
          correo,
        }),
      });
  
      if (response.ok) {
        Alert.alert("Éxito", "Usuario actualizado correctamente");
        fetchUsuarios(); // Recargar lista
      } else {
        Alert.alert("Error", "No se pudo actualizar el usuario");
      }
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      Alert.alert("Error", "Ocurrió un error al actualizar los datos");
    }
  };
  


  // Ejecutar al cargar componente
  useEffect(() => {
    fetchUsuarios();
    console.log("actualizando en useEffect");
  }, []);
 
  return {
    nombre,
    setNombre,
    edad,
    setEdad,
    correo,
    setCorreo,
    handleGuardar,
    handleDelete,
    handleUpdate,
    usuarios,
    loading,
    fetchUsuarios,
  };
};
 
export default useFetchUser;