import React, { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
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

const UpdateUser = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [country, setCountry] = useState('');
  const [gender, setGender] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Obtiene el usuario actual
    const currentUser = firebase.auth().currentUser;
    setUser(currentUser);

    // Obtiene los datos del usuario actual desde Firebase Authentication
    const getUserData = async () => {
      const idTokenResult = await currentUser.getIdTokenResult();
      const { name, age, country, gender } = idTokenResult.claims;
      setName(name || '');
      setAge(age || '');
      setCountry(country || '');
      setGender(gender || '');
    };

    if (currentUser) {
      getUserData();
    }
  }, []);

  const handleUpdate = async () => {
    try {
      // Actualiza los datos del usuario en Firebase Authentication
      await firebase.auth().currentUser.updateProfile({
        displayName: name,
      });

      // Actualiza los datos personalizados del usuario en Firebase Authentication
      await firebase.auth().currentUser.getIdToken(true);

      const { uid } = firebase.auth().currentUser;
      await firebase.auth().setCustomUserClaims(uid, {
        name,
        age,
        country,
        gender,
      });

      setShowModal(true);
    } catch (error) {
      console.error('Error al actualizar los datos del usuario', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <h2>Actualizar datos de usuario</h2>
      <Form>
        <Form.Group controlId="name">
          <Form.Label>Nombre:</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="age">
          <Form.Label>Edad:</Form.Label>
          <Form.Control
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="country">
          <Form.Label>País:</Form.Label>
          <Form.Control
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="gender">
          <Form.Label>Género:</Form.Label>
          <Form.Control
            as="select"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Seleccionar</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            <option value="Otro">Otro</option>
          </Form
