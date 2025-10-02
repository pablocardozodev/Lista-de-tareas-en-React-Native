import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { saveNote, getNotes, deleteNote } from '../storage/notesStorage';
import { emailToKey } from '../storage/authStorage'; // si usaste esto para usuarios

export default function HomeScreen({ route }) {
  const { email } = route.params; // email del usuario logueado
  const userKey = emailToKey(email);

  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    const savedNotes = await getNotes(userKey);
    setNotes(savedNotes);
  };

  const handleAddNote = async () => {
    if (!newNote) return;
    await saveNote(userKey, newNote);
    setNewNote('');
    loadNotes();
  };

  const handleDeleteNote = async (index) => {
    await deleteNote(userKey, index);
    loadNotes();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Notas</Text>

      <TextInput
        style={styles.input}
        placeholder="Nueva nota"
        value={newNote}
        onChangeText={setNewNote}
      />
      <Button title="Agregar" onPress={handleAddNote} />

      <FlatList
        data={notes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.note}>
            <Text>{item}</Text>
            <Button title="Eliminar" onPress={() => handleDeleteNote(index)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  note: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
});
