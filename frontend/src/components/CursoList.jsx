import { Button, Card, CardContent, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './NavBar.jsx';

function CursoList() {
  const [cursos, setCursos] = useState([]);

  const navigate = useNavigate();

  const loadCursos = async () => {
    try {
      const response = await fetch('http://localhost:3000/cursos');
      if (!response.ok) {
        throw new Error('Failed to fetch cursos');
      }
      const data = await response.json();
      // Para cada curso, realizar una consulta adicional para obtener los detalles completos de los temas
      const cursosConTemas = await Promise.all(
        data.map(async (curso) => {
          const temasPromises = curso.temas.map(async (temaId) => {
            const temaResponse = await fetch(
              `http://localhost:3000/temas/${temaId}`
            );
            if (!temaResponse.ok) {
              throw new Error(`Failed to fetch tema with ID ${temaId}`);
            }
            const temaData = await temaResponse.json();
            return { ...temaData, cursoId: curso._id }; // Devolver tema con cursoId
          });
          const temas = await Promise.all(temasPromises);
          return { ...curso, temas }; // Agregar los detalles completos de los temas al curso
        })
      );
      setCursos(cursosConTemas);
    } catch (error) {
      console.error('Error fetching cursos:', error);
    }
  };

  const handleRevisado = async (temaId, cursoId, revisado) => {
    try {
      // Cambiar estado localmente
      const updatedCursos = cursos.map((curso) => {
        if (curso._id === cursoId) {
          const updatedTemas = curso.temas.map((tema) => {
            if (tema._id === temaId) {
              return { ...tema, revisado: !tema.revisado }; // Cambiado aquí
            }
            return tema;
          });
          return { ...curso, temas: updatedTemas };
        }
        return curso;
      });
      setCursos(updatedCursos);

      // Actualizar estado en la base de datos
      await fetch(`http://localhost:3000/temas/${temaId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ revisado: !revisado }),
      });
    } catch (error) {
      console.error('Error updating tema:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/cursos/${id}`, {
        method: 'DELETE',
      });
      setCursos(cursos.filter((curso) => curso._id !== id));
    } catch (error) {
      console.error('Error deleting curso:', error);
    }
  };

  useEffect(() => {
    loadCursos();
  }, []);

  const styles = {
    paddingInline: '40px',
  };

  return (
    <>
      <Navbar />
      <div style={styles}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem',
          }}
        >
          <h1>Lista de Cursos</h1>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/cursos/new')}
          >
            Nuevo Curso
          </Button>
        </div>

        {cursos.map((curso) => (
          <Card
            style={{
              marginBottom: '.7rem',
              backgroundColor: '#1e272e',
            }}
            key={curso._id}
          >
            <CardContent
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ color: 'white' }}>
                <Typography variant="h6">{curso.titulo}</Typography>
                <Typography variant="body1">Temas:</Typography>
                <ul>
                  {curso.temas.map((tema, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '0.5rem',
                      }}
                    >
                      <li>{tema.titulo}</li>
                      <div style={{ textAlign: 'right' }}>
                        <Button
                          variant="contained"
                          color={tema.revisado ? 'secondary' : 'primary'}
                          style={{ marginLeft: '5rem' }}
                          onClick={() => handleRevisado(tema._id, tema.cursoId)}
                        >
                          {tema.revisado ? 'NO REVISADO' : 'REVISADO'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </ul>
                <Typography variant="body2">
                  Creado el: {new Date(curso.createdAt).toLocaleString()}
                </Typography>
              </div>
              <div>
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={() => navigate(`/cursos/${curso._id}/edit`)}
                >
                  Editar
                </Button>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => handleDelete(curso._id)}
                  style={{ marginLeft: '.5rem' }}
                >
                  Eliminar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}

export default CursoList;
