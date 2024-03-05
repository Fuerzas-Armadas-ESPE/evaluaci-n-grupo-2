import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SelectTemas from './SelectTemas.jsx'; // Importa el componente SelectTemas

export default function CursoForm() {
  const [curso, setCurso] = useState({
    titulo: '',
    temas: [],
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = params.id
        ? `http://localhost:3000/cursos/${params.id}`
        : 'http://localhost:3000/cursos';
      const method = params.id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(curso),
      });
      await response.json();
      setLoading(false);
      navigate('/cursos');
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setCurso({ ...curso, [e.target.name]: e.target.value });
  };

  // Función para manejar cambios en la selección de temas
  const handleChangeTemas = (event) => {
    setCurso({ ...curso, temas: event.target.value });
  };

  const loadCurso = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/cursos/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch curso');
      }
      const data = await response.json();
      setCurso(data);
    } catch (error) {
      console.error('Error fetching curso:', error);
    }
  };

  useEffect(() => {
    if (params.id) {
      loadCurso(params.id);
    }
  }, [params.id]);

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={3}>
        <Card
          sx={{ mt: 5 }}
          style={{ backgroundColor: '#1e272e', padding: '1rem' }}
        >
          <Typography variant="5" textAlign="center" color="white">
            {params.id ? 'Editar Curso' : 'Crear Curso'}
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="filled"
                label="Título"
                sx={{
                  display: 'block',
                  margin: '.5rem 0',
                }}
                name="titulo"
                value={curso.titulo}
                onChange={handleChange}
                inputProps={{ style: { color: 'white' } }}
                InputLabelProps={{ style: { color: 'white' } }}
              />

              {/* Integración del componente SelectTemas */}
              <SelectTemas
                value={curso.temas}
                onChange={handleChangeTemas}
                sx={{ marginBottom: '1rem' }}
              />

              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!curso.titulo || !curso.temas.length}
                sx={{ marginTop: '1rem' }} // Agrega margen superior al botón
              >
                {loading ? (
                  <CircularProgress color="inherit" size={24} />
                ) : (
                  'Guardar'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
