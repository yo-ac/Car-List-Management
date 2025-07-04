import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PersonShow from './components/PersonShow'; 


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/people/:id" element={<PersonShow />} />
    </Routes>
  );
};

export default App;
