import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function NoteItem({ title, date, status, onEdit, onDelete }) {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.status}>
          {status === 'hecho' ? '✔️ Hecho' : '⏳ Pendiente'}
        </Text>
      </View>
      <View style={styles.actions}>
        {/* <Button title="Editar" onPress={onEdit} />*/ }
        <Button title="Eliminar" onPress={onDelete} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  info: {
    marginBottom: 5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  date: {
    color: 'gray',
  },
  status: {
    marginTop: 5,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});