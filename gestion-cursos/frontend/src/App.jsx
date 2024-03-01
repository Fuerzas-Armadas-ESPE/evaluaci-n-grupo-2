import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import NavBar from './components/NavBar';
import CursoList from './components/CursoList';
import CursoForm from './components/CursoForm';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/cursos" element={<CursoList />} />
        <Route path="/cursos/new" element={<CursoForm />} />
        {/* Rutas adicionales para editar o ver detalles de cursos */}
      </Routes>
    </Router>
  );
}

export default App;
