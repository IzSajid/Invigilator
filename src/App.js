import './index.css';
import React from 'react';
import Header from './compotents/Header';
import Welcome from './pages/welcome';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import Register from './pages/register';
import Cohort from './compotents/cohort';

function App() {
  return (
    <BrowserRouter>
      <Header>
        <Routes>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path='/dashboard/:id' element={<Cohort />} />'          
        </Routes>
      </Header>
    </BrowserRouter>
  );
}

export default App;
