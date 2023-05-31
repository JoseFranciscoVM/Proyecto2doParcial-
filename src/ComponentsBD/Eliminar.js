import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

// Configura tu firebaseConfig con los datos de tu proyecto
const firebaseConfig = {
  apiKey: 'TU_API_KEY',
  authDomain: 'TU_DOMINIO',
  projectId: 'TU_ID_DE_PROYECTO',
  // ...otros datos de configuración de Firebase...
};

// Inicializa la app de Firebase
firebase.initializeApp(firebaseConfig);

const DeleteUser = () => {
  const [confirmation, setConfirmation] = useState(false);
  const [error, setError] = useState(null);

  const handleDeleteUser = () => {
    if (confirmation) {
      const user = firebase.auth().currentUser;
      user
        .delete()
        .then(() => {
          // Eliminación exitosa del usuario
          console.log('Usuario eliminado exitosamente');
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  };

  const handleConfirmation = (confirm) => {
    setConfirmation(confirm);
  };

  return (
    <div>
      <h2>Eliminar Usuario</h2>
      {error && <p>{error}</p>}
      <p>¿Estás seguro de eliminar el dato?</p>
      <button onClick={() => handleConfirmation(true)}>Sí</button>
      <button onClick={() => handleConfirmation(false)}>No</button>
      <br />
      <button onClick={handleDeleteUser}>Eliminar</button>
    </div>
  );
};

export default DeleteUser;
