import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import SaveIcon from '@mui/icons-material/Save';
import { gql, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';

const UPDATE_CAR = gql`
  mutation UpdateCar($id: ID!, $year: Int!, $make: String!, $model: String!, $price: Float!) {
    updateCar(id: $id, year: $year, make: $make, model: $model, price: $price) {
      id
      year
      make
      model
      price
    }
  }
`;

const DELETE_CAR = gql`
  mutation DeleteCar($id: ID!) {
    deleteCar(id: $id) {
      id
    }
  }
`;

const DELETE_PERSON = gql`
  mutation DeletePerson($id: ID!) {
    deletePerson(id: $id) {
      id
    }
  }
`;

const PersonCard = ({ person, refetch }) => {
  const [editCarId, setEditCarId] = useState(null);
  const [editedCar, setEditedCar] = useState({});

  const [updateCar] = useMutation(UPDATE_CAR);
  const [deleteCar] = useMutation(DELETE_CAR);
  const [deletePerson] = useMutation(DELETE_PERSON);

  const handleEditClick = (car) => {
    setEditCarId(car.id);
    setEditedCar({ ...car });
  };

  const handleInputChange = (field, value) => {
    setEditedCar((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveClick = async () => {
    try {
      await updateCar({
        variables: {
          id: editedCar.id,
          year: parseInt(editedCar.year),
          make: editedCar.make,
          model: editedCar.model,
          price: parseFloat(editedCar.price),
        },
      });
      setEditCarId(null);
      if (refetch) refetch();
    } catch (err) {
      console.error('error updating car:', err);
    }
  };

  const handleDeleteCarClick = async (id) => {
    try {
      await deleteCar({ variables: { id } });
      if (refetch) refetch();
    } catch (err) {
      console.error('error deleting car:', err);
    }
  };

  const handleDeletePerson = async (id) => {
    try {
      await deletePerson({ variables: { id } });
      if (refetch) refetch();
    } catch (err) {
      console.error('error deleting person:', err);
    }
  };

  return (
    <div style={{ border: '1px solid #E0E0E0', marginBottom: '1rem' }}>
      <div style={{ borderBottom: '1px solid #f5f5f5', padding: 5 }}>
        <h2 style={{ margin: 0, fontSize: 14, padding: 5 }}>
          {person.firstName} {person.lastName}
        </h2>
      </div>

      <div style={{ margin: 10, display: 'flex', gap: 4, flexDirection: 'column' }}>
        {person.cars.length > 0 &&
          person.cars.map((car) => (
            <div key={car.id} style={{ padding: 5, border: '1px solid #f5f5f5', display: 'flex', justifyContent: 'space-between' }}>
              <div>
                {editCarId === car.id ? (
                  <>
                    <input value={editedCar.year} onChange={(e) => handleInputChange('year', e.target.value)} />
                    <input value={editedCar.make} onChange={(e) => handleInputChange('make', e.target.value)} />
                    <input value={editedCar.model} onChange={(e) => handleInputChange('model', e.target.value)} />
                    <input value={editedCar.price} onChange={(e) => handleInputChange('price', e.target.value)} />
                  </>
                ) : (
                  <p style={{ background: '#f5f5f5', padding: 5, margin: 0, fontSize: 13 }}>
                    {car.year} {car.make} {car.model} - ${parseFloat(car.price).toLocaleString()}
                  </p>
                )}
              </div>
              <div>
                {editCarId === car.id ? (
                  <SaveIcon
                    onClick={handleSaveClick}
                    style={{ height: 15, width: 15, color: 'gray', cursor: 'pointer', marginRight: 5 }}
                  />
                ) : (
                  <EditIcon
                    onClick={() => handleEditClick(car)}
                    style={{ height: 15, width: 15, color: 'gray', cursor: 'pointer', marginRight: 5 }}
                  />
                )}
                <DeleteSharpIcon
                  onClick={() => handleDeleteCarClick(car.id)}
                  style={{ height: 15, width: 15, color: 'red', cursor: 'pointer' }}
                />
              </div>
            </div>
          ))}
        <p style={{ fontSize: 13, margin: 10 }}>
          <Link to={`/people/${person.id}`} style={{ background: 'yellow', padding: 5, textDecoration: 'none', color: 'black' }}>
            Learn More
          </Link>
        </p>
      </div>

      <div style={{ borderTop: '1px solid #f5f5f5', padding: 5, display: 'flex', justifyContent: 'center' }}>
        <DeleteSharpIcon
          onClick={() => handleDeletePerson(person.id)}
          style={{ height: 18, width: 18, color: 'red', cursor: 'pointer', marginRight: 5 }}
        />
      </div>
    </div>
  );
};

export default PersonCard;
