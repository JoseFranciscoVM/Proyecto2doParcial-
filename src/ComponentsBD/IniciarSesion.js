import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
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

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const iniciarSesion = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Acceso exitoso, puedes redirigir al usuario a otra página o realizar otras acciones necesarias
        console.log('Inicio de sesión exitoso');
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const registrarUsuario = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Registro exitoso, puedes redirigir al usuario a otra página o realizar otras acciones necesarias
        console.log('Usuario registrado exitosamente');
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form>
        <Form.Group controlId="email">
          <Form.Label>Correo Electrónico:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Contraseña:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={iniciarSesion}>
          Iniciar Sesión
        </Button>
        {' '}
        <Button variant="success" onClick={registrarUsuario}>
          Registrarse
        </Button>
      </Form>
    </div>
  );
};

export default Auth;
