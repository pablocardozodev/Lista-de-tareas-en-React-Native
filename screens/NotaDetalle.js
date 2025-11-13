import React, { useState} from "react";
import {View, Text, TextInput, Button, StyleSheet, Alert} from "react-native";
import { saveNote, getNotes, deleteNote, editNote } from '../storage/notesStorage';
import {Picker} from "@react-native-picker/picker"; // importante
import {useManejarNotas} from ".."
import { emailToKey } from "../storage/authStorage";

export default function NotaDetalle( { route, navigation}) {
    const {email, index, contenidoOriginal } = route.params;
    const userKey = emailToKey(email);

    const handleEditar = () => {
        navigation.navigate("NotaFormulario", {
        email,
        modo: "editar",
        index,
        notaExistente: contenidoOriginal,
        });
    };

    return(

        <View>
            <Text>Detalle de Nota</Text>
            <Text>Título:</Text>
            <TextInput

                value={contenidoOriginal.titulo}
                editable={false}
            />
            <Text >Contenido:</Text>
            <TextInput

                value={contenidoOriginal.contenido}
                editable={false}
                multiline
            />
            <Text >Estado:</Text>
            <TextInput

                value={contenidoOriginal.estado === "hecho" ? "Hecho ✅" : "Pendiente 🕓"}
                editable={false}
            />
            <Text >Fecha:</Text>
            <TextInput

                value={new Date(contenidoOriginal.fecha).toLocaleString()}
                editable={false}
      />
        <View>
            <Button title="Editar" onPress={handleEditar} />

        </View>
      </View>

    )
}