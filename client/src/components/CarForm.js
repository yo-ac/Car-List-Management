import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { GET_ALL_DATA } from '../graphql';
import Divider from '@mui/material/Divider';


const ADD_CAR = gql`
  mutation AddCar($year: String!, $make: String!, $model: String!, $price: String!, $personId: ID!) {
    addCar(year: $year, make: $make, model: $model, price: $price, personId: $personId) {
      id
      year
      make
      model
      price
      personId
    }
  }
`;

const CarForm = ({ people }) => {
  const [formData, setFormData] = useState({
    year: '',
    make: '',
    model: '',
    price: '',
    personId: ''
  });

  const [addCar] = useMutation(ADD_CAR, {
    update(cache, { data: { addCar } }) {
      const { people } = cache.readQuery({ query: GET_ALL_DATA });
      const updatedPeople = people.map(p =>
        p.id === addCar.personId
          ? { ...p, cars: [...p.cars, addCar] }
          : p
      );
      cache.writeQuery({
        query: GET_ALL_DATA,
        data: { people: updatedPeople }
      });
    },
    optimisticResponse: {
      addCar: {
        ...formData,
        id: Date.now().toString(),
        __typename: 'Car'
      }
    }
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { year, make, model, price, personId } = formData;
    if (!year || !make || !model || !price || !personId) return;
    addCar({ variables: formData });
    setFormData({ year: '', make: '', model: '', price: '', personId: '' });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
      <Divider style={{ paddingBottom: '1rem', fontWeight: 'bold', }} > Add Car </Divider>
      <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
        <labe style={{ fontSize: 13, }}>Year: </labe>
        <input name="year" placeholder="Year *" value={formData.year} onChange={handleChange} style={{ marginRight: '0.2rem', border: '1px solid #E0E0E0', padding: 5, width: 40  }} />
        <label style={{ fontSize: 13, }}>Make: </label>
        <input name="make" placeholder="Make *" value={formData.make} onChange={handleChange} style={{ marginRight: '0.5rem', border: '1px solid #E0E0E0', padding: 5,  width: 80  }} />
        <label style={{ fontSize: 13, }}>Model: </label>
        <input name="model" placeholder="Model *" value={formData.model} onChange={handleChange} style={{ marginRight: '0.5rem', border: '1px solid #E0E0E0', padding: 5, width: 80  }} />
        <label style={{ fontSize: 13, }}>Price: </label>
        <input name="price" placeholder="$ *" value={formData.price} onChange={handleChange} style={{ marginRight: '0.5rem', border: '1px solid #E0E0E0', padding: 5, width: 80  }} />
        <label style={{ fontSize: 13, }}>Person: </label>
        <select name="personId" value={formData.personId} onChange={handleChange} style={{ marginRight: '0.5rem', border: '1px solid #E0E0E0', padding: 5,  }}>
          <option value="">Select a person</option>
          {people.map(p => (
            <option key={p.id} value={p.id}>
              {p.firstName} {p.lastName}
            </option>
          ))}
        </select>
        <button type="submit" style={{ border: 'none', padding: 5, background: 'yellow' }}>Add Car</button>
      </div>
    </form>
  );
};

export default CarForm;
