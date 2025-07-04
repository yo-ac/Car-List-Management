import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { GET_ALL_DATA } from '../graphql';
import Divider from '@mui/material/Divider';



const ADD_PERSON = gql`
  mutation AddPerson($firstName: String!, $lastName: String!) {
    addPerson(firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
      cars { id }
    }
  }
`;

const PersonForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [addPerson] = useMutation(ADD_PERSON, {
    update(cache, { data: { addPerson } }) {
      const { people } = cache.readQuery({ query: GET_ALL_DATA });
      cache.writeQuery({
        query: GET_ALL_DATA,
        data: { people: [...people, addPerson] }
      });
    },
    optimisticResponse: {
      addPerson: {
        id: Date.now().toString(), // ID temporal
        firstName,
        lastName,
        cars: [],
        __typename: 'Person'
      }
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim()) return;

    addPerson({ variables: { firstName, lastName } });
    setFirstName('');
    setLastName('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem', marginTop: '4rem', }}>
      <Divider style={{ paddingBottom: '1rem', fontWeight: 'bold', }} > Add Person </Divider>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <label style={{ fontSize: 14, }}>* First Name: </label>
        <input
          type="text"
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          style={{ marginRight: '0.5rem', border: '1px solid #E0E0E0', padding: 5 }}
          required
        />
        <label style={{ fontSize: 14 }}>* Last Name: </label>
        <input
          type="text"
          placeholder="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          style={{ marginRight: '0.5rem', border: '1px solid #E0E0E0', padding: 5 }}
          required
        />
        <button type="submit" style={{border:'none', padding: 5, background:'yellow'}}>Add Person</button>
      </div>

    </form>
  );
};

export default PersonForm;
