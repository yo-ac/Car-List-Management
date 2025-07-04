import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_DATA } from '../graphql';
import PersonCard from '../components/PersonCard';
import PersonForm from '../components/PersonForm';
import CarForm from '../components/CarForm';

const HomePage = () => {
  const { loading, error, data, refetch } = useQuery(GET_ALL_DATA);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const people = data && data.people ? data.people : [];

  return (
    <div style={{ width: '1000px', margin:'auto', borderRight: '3px solid black', borderLeft: '3px solid black', padding:'2rem' }}>
      <h1 style={{textAlign: 'center', textTransform: 'upperCase', fontSize: 20, borderBottom: '1px solid #E0E0E0', paddingBottom: '2rem'}}>People and their Cars</h1>
      
      <PersonForm />

      {people.length > 0 && <CarForm people={people} />}

      <div style={{ marginTop: '2rem' }}>
        {people.map(person => (
          <PersonCard key={person.id} person={person} refetch={refetch}/>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
