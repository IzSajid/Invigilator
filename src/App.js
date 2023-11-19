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
import DeleteCohortPage from './pages/deleteCohort';
import DeleteExamPage from './pages/deleteExam';

function App() {
  return (
    <BrowserRouter>
      <Header>
        <Routes>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path='/cohort/:id' element={<Cohort />} />
          <Route path='/people/:id' element={<People/>} />  
          <Route path='/cohort/:id/delete' element={<DeleteCohortPage/>} />
          <Route path='/cohort/:cohortId/exam/:examId' element={<Exam/>} />  
          <Route path='/cohort/:cohortId/exam/:examId/delete' element={<DeleteExamPage/>} />     
        </Routes>
      </Header>
    </BrowserRouter>
  );
}

export default App;
