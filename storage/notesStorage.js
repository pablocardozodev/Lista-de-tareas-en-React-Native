import AsyncStorage from '@react-native-async-storage/async-storage';

// Guardar una nueva nota
export async function saveNote(userKey, note) {
  try {
    const notes = await getNotes(userKey);
    notes.push(note);
    await AsyncStorage.setItem(userKey, JSON.stringify(notes));
  } catch (error) {
    console.log("Error guardando nota:", error);
  }
}

// Obtener todas las notas
export async function getNotes(userKey) {
  try {
    const notesString = await AsyncStorage.getItem(userKey);
    return notesString ? JSON.parse(notesString) : [];
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
