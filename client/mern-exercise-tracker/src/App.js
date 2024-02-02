import React from 'react';
// import 'bootstap/dist/css/bootstap/min/css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './components/navbar';
import Exerciselist from './components/exercise-list'; 
import EditExercise from './components/edit-exercise'; 
import CreateExercise from './components/create-exercise';
import CreateUser from './components/create-user';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Exerciselist/>} />
        <Route path="/edit/:id" element={<EditExercise/>} />
        <Route path="/create" element={<CreateExercise/>} />
        <Route path="/user" element={<CreateUser/>} />
      </Routes>

    </Router>
  );
}

export default App;
