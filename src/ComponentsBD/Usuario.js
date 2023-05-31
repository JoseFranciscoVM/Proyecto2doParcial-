import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

// Configura tu firebaseConfig con los datos de tu proyecto
const firebaseConfig = {
  apiKey: 'TU_API_KEY',
  authDomain: 'TU_DOMINIO',
  projectId: 'TU_ID_DE_PROYECTO',
  // ...otros datos de configuración de Firebase...
};

// Inicializa la app de Firebase
firebase.initializeApp(firebaseConfig);

const UserForm = () => {
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [pais, setPais] = useState('');
  const [genero, setGenero] = useState('');

  const guardarDatosUsuario = () => {
    const db = firebase.firestore();

    // Crea un objeto con los datos del usuario
    const datosUsuario = {
      nombre,
      edad,
      pais,
      genero,
    };

    // Guarda los datos en Firestore
    db.collection('datos-usuario')
      .doc('datos')
      .update({
        datos: firebase.firestore.FieldValue.arrayUnion(datosUsuario),
      })
      .then(() => {
        console.log('Datos guardados exitosamente');
      })
      .catch((error) => {
        console.error('Error al guardar los datos:', error);
      });
  };

  return (
    <div>
      <label>
        Nombre:
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </label>
      <br />
      <label>
        Edad:
        <input
          type="text"
          value={edad}
          onChange={(e) => setEdad(e.target.value)}
        />
      </label>
      <br />
      <label>
        País:
        <input
          type="text"
          value={pais}
          onChange={(e) => setPais(e.target.value)}
        />
      </label>
      <br />
      <label>
        Género:
        <input
          type="text"
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
        />
      </label>
      <br />
      <button onClick={guardarDatosUsuario}>Guardar</button>
    </div>
  );
};

export default UserForm;