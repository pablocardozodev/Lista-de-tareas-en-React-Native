import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { saveNote, getNotes, deleteNote, editNote } from '../storage/notesStorage';
import { emailToKey } from '../storage/authStorage'; // si usaste esto para usuarios
import NoteItem from '../components/NoteItem';
import { useFocusEffect } from "@react-navigation/native";

export default function HomeScreen({ route, navigation }) {
  const { email } = route.params; // email del usuario logueado
  const userKey = emailToKey(email);

  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  useFocusEffect(
    useCallback(() => {
      loadNotes();
    }, [])
  );

  const loadNotes = async () => {
    console.log("Dentro de la función");
    const savedNotes = await getNotes(userKey);
    console.log(savedNotes)
    setNotes(savedNotes);
  };

  {/* const handleAddNote = async ({title, content, status}) => {
    if (!newNote) return;
    await saveNote(userKey, newNote);
    setNewNote('');
    loadNotes();
  }; */} // despues se elimina

  const handleDeleteNote = async (index) => {
    await deleteNote(userKey, index);
    loadNotes();
  };

  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Notas</Text>

      {/* <TextInput
        style={styles.input}
        placeholder="Nueva nota"
        value={newNote}
        onChangeText={setNewNote}
      /> */}
      <Button
        title="Agregar nota"
        onPress={() =>
          navigation.navigate("NotaFormulario", { email, modo: "agregar" })
        }
      />

      <FlatList
        data={notes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() =>
                navigation.navigate("NotaDetalle", {
                  email,
                  index,
                  contenidoOriginal: item,
                })
              }
            >
            <NoteItem
              title={item.titulo}
              date={item.fecha}
              status={item.estado}

              onDelete={() => handleDeleteNote(index)}
            />
          </TouchableOpacity>

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
