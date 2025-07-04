import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';

const PERSON_WITH_CARS = gql`
  query PersonWithCars($id: ID!) {
    personWithcars(id: $id) {
      id
      firstName
      lastName
      cars {
        id
        year
        make
        model
        price
      }
    }
  }
`;

const PersonShow = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, loading, error } = useQuery(PERSON_WITH_CARS, {
    variables: { id }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading person</p>;

  const person = data.personWithcars;

  return (
    <div style={{ padding: 20 }}>
      <h2>{person.firstName} {person.lastName}</h2>
      <h3>Cars:</h3>
      {person.cars.length === 0 ? (
        <p>No cars</p>
      ) : (
        <ul>
          {person.cars.map(car => (
            <li key={car.id}>
              {car.year} {car.make} {car.model} - ${parseFloat(car.price).toLocaleString()}
            </li>
          ))}
        </ul>
      )}

      <button onClick={() => navigate('/')} style={{border:'none', padding: 5, background:'yellow'}}>
        Go back home
      </button>
    </div>
  );
};

export default PersonShow;
