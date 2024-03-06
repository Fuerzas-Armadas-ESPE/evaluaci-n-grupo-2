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

export default function TemaForm() {
  const [tema, setTema] = useState({
    titulo: '',
    revisado: false,
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = params.id
        ? `http://localhost:3000/temas/${params.id}`
        : 'http://localhost:3000/temas';
      const method = params.id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tema),
      });
      await response.json();
      setLoading(false);
      navigate('/temas');
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setTema({ ...tema, [e.target.name]: e.target.value });
  };

  const loadTema = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/temas/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch tema');
      }
      const data = await response.json();
      setTema(data);
    } catch (error) {
      console.error('Error fetching tema:', error);
    }
  };

  const handleCancel = () => {
    navigate('/temas');
  };

  useEffect(() => {
    if (params.id) {
      loadTema(params.id);
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
            {params.id ? 'Editar Tema' : 'Crear Tema'}
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
                value={tema.titulo}
                onChange={handleChange}
                inputProps={{ style: { color: 'white' } }}
                InputLabelProps={{ style: { color: 'white' } }}
              />

              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!tema.titulo}
              >
                {loading ? (
                  <CircularProgress color="inherit" size={24} />
                ) : (
                  'Guardar'
                )}
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleCancel}
              >
                Cancelar
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
