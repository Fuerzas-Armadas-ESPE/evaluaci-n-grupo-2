import { Button, Card, CardContent, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './NavBar.jsx';

function CursoList() {
    const [cursos, setCursos] = useState([]);
    const navigate = useNavigate();

    const loadCursos = async () => {
        const response = await fetch("http://localhost:3000/cursos"); // Cambia la URL según la ruta de tu backend
        const data = await response.json();
        setCursos(data);
    };

    useEffect(() => {
        loadCursos();
    }, []);

    return (
        <>
            <Navbar />
            <div>
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
                        marginBottom: ".7rem",
                        backgroundColor: '#1e272e'
                    }}
                    key={curso._id} // Cambia el nombre del campo ID según el formato de tu objeto de curso
                >
                    <CardContent
                        style={{
                            display: "flex",
                            justifyContent: "space-between"
                        }}
                    >
                        <div style={{ color: 'white' }}>
                            <Typography>{curso.titulo}</Typography>
                            <Typography>{curso.createdAt}</Typography>
                        </div>
                        <div>
                            <Button
                                variant='contained'
                                color='inherit'
                                onClick={() => navigate(`/cursos/${curso._id}/edit`)} // Cambia el nombre del campo ID según el formato de tu objeto de curso
                            >
                                Editar
                            </Button>
                            <Button
                                variant='contained'
                                color='warning'
                                onClick={() => handleDelete(curso._id)} // Cambia el nombre del campo ID según el formato de tu objeto de curso
                                style={{ marginLeft: ".5rem" }}
                            >
                                Eliminar
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </>
    );
}

export default CursoList;
