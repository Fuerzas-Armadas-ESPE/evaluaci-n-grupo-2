import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import CursoList from './components/CursoList';
import CursoForm from './components/CursoForm';
import TemaList from './components/TemaList';
import TemaForm from './components/TemaForm';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/cursos" />} />
        <Route path="/cursos" element={<CursoList />} />
        <Route path="/cursos/new" element={<CursoForm />} />
        <Route path="/cursos/:id/edit" element={<CursoForm />} />
        <Route path="/temas" element={<TemaList />} />
        <Route path="/temas/new" element={<TemaForm />} />
        <Route path="/temas/:id/edit" element={<TemaForm />} />
      </Routes>
    </Router>
  );
}

export default App;
