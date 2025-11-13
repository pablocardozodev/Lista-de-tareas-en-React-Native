import AsyncStorage from '@react-native-async-storage/async-storage';

// Guardar una nueva nota
export async function saveNote(userKey, note) {
  try {
    const notes = await getNotes(userKey);
    const nuevaNota = {
      id: Date.now(), // id único
      titulo: note.titulo || "Sin título",
      contenido: note.contenido || "",
      fecha: note.fecha || new Date().toISOString(),
      estado: note.estado || "pendiente", // o "hecho"
    };
    notes.push(nuevaNota);
    await AsyncStorage.setItem(userKey, JSON.stringify(notes));
  } catch (error) {
    console.log("Error guardando nota:", error);
  }
}

// Obtener todas las notas
export async function getNotes(userKey) {
  try {
    const notesString = await AsyncStorage.getItem(userKey);
    const parsed = notesString ? JSON.parse(notesString) : [];
    return Array.isArray(parsed) ? parsed.filter((n) => n) : [];
  } catch (error) {
    console.log("Error obteniendo notas:", error);
    return [];
  }
}

// Eliminar una nota por índice
export async function deleteNote(userKey, index) {
  try {
    const notes = await getNotes(userKey);
    notes.splice(index, 1);
    await AsyncStorage.setItem(userKey, JSON.stringify(notes));
  } catch (error) {
    console.log("Error eliminando nota:", error);
  }
}

// Editar una nota por índice
export async function editNote(userKey, index, newContent) {
  try {
    const notes = await getNotes(userKey);
    if (index >= 0 && index < notes.length){
      notes[index] = newContent; // reemplaza la nota de ese índice
      await AsyncStorage.setItem(userKey, JSON.stringify(notes));
    } else{
      console.log("Índice fuera de rango");
    }
  } catch (error) {
    console.log("Error editando nota:", error);
  }
}
