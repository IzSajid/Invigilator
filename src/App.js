import './index.css';
import React from 'react';
import Header from './compotents/Header';
import Welcome from './pages/welcome';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/signup';
import Dashboard from './pages/dashboard';

function App() {
  return (
    <BrowserRouter>
      <Header>
        <Routes>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />          
        </Routes>
      </Header>
    </BrowserRouter>
  );
}

export default App;
