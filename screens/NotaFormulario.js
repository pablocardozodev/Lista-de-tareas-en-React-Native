import React, { useState} from "react";
import {View, Text, TextInput, Button, StyleSheet, Alert} from "react-native";
import { saveNote, getNotes, deleteNote, editNote } from '../storage/notesStorage';
import {Picker} from "@react-native-picker/picker"; // importante
import {useManejarNotas} from ".."
import { emailToKey } from "../storage/authStorage";

export default function NotaFormulario( { route, navigation}) {
    const { email, modo, index = null, notaExistente = null } = route.params;
    const userKey = emailToKey(email);

    const [titulo, setTitulo] = useState(notaExistente?.titulo || "");
    const [contenido, setContenido] = useState(notaExistente?.contenido || "");
    const [estado, setEstado] = useState(notaExistente?.estado || "pendiente");

    const handleGuardar = async () => {
        if (!titulo.trim()) {
            Alert.alert("Error", "El título no puede estar vacío");
            return;
        }

        if (modo === "editar") {
            const notaActualizada = {
                ...notaExistente,
                titulo,
                contenido,
                estado,
                fecha: new Date().toISOString(),
            };
            await editNote (userKey, index, notaActualizada)
            Alert.alert("Listo", "Nota editada correctamente");
        } else {
            const NuevaNota = {
                titulo,
                contenido,
                fecha: new Date().toISOString(),
                estado,
            }
            await saveNote(userKey, NuevaNota);
            Alert.alert("Listo", "Nora agregada correctamente");
        }
        navigation.goBack();
    }

    return(
        <View>
            <TextInput
                onChangeText={setTitulo}
                value={titulo}
                placeholder="Título"
            />
            <TextInput
                onChangeText={setContenido}
                value={contenido}
                placeholder="Contenido"
            />
            <Picker
                selectedValue={estado}
                onValueChange={(value) => setEstado(value)}
                >
                <Picker.Item label="Pendiente" value="pendiente" />
                <Picker.Item label="Hecho" value="hecho" />
            </Picker>
            <Button title="Guardar" onPress={handleGuardar} />
        </View>
    )
}