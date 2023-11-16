import './index.css';
import React from 'react';
import Header from './compotents/Header';
import Welcome from './pages/welcome';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import Register from './pages/register';
import Cohort from './pages/cohort';
import People from './pages/people';
import Exam from './pages/exam';
import Logout from './pages/logout';

function App() {
  return (
    <BrowserRouter>
      <Header>
        <Routes>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path='/cohort/:id' element={<Cohort />} />
          <Route path='/people/:id' element={<People/>} />  
          <Route path='/exam/:id' element={<Exam/>} />        
        </Routes>
      </Header>
    </BrowserRouter>
  );
}

export default App;
