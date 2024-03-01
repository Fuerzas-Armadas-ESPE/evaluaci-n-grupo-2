import { Button, Card, CardContent, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './NavBar.jsx';

function TemaList() {
    const [temas, setTemas] = useState([]);
    const navigate = useNavigate();

    const loadTemas = async () => {
        try {
            const response = await fetch("http://localhost:3000/temas");
            if (!response.ok) {
                throw new Error('Failed to fetch temas');
            }
            const data = await response.json();
            setTemas(data);
        } catch (error) {
            console.error('Error fetching temas:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:3000/temas/${id}`, {
                method: "DELETE",
            });
            setTemas(temas.filter(tema => tema._id !== id));
        } catch (error) {
            console.error('Error deleting tema:', error);
        }
    };

    useEffect(() => {
        loadTemas();
    }, []);

    return (
        <>
            <Navbar />
            <div>
                <h1>Lista de Temas</h1>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => navigate('/temas/new')}
                >
                    Nuevo Tema
                </Button>
            </div>
            
            {temas.map((tema) => (
                <Card
                    style={{
                        marginBottom: ".7rem",
                        backgroundColor: '#1e272e'
                    }}
                    key={tema._id}
                >
                    <CardContent
                        style={{
                            display: "flex",
                            justifyContent: "space-between"
                        }}
                    >
                        <div style={{ color: 'white' }}>
                            <Typography>{tema.titulo}</Typography>
                            <Typography>{tema.revisado ? 'Revisado' : 'No revisado'}</Typography>
                        </div>
                        <div>
                            <Button
                                variant='contained'
                                color='inherit'
                                onClick={() => navigate(`/temas/${tema._id}/edit`)}
                            >
                                Editar
                            </Button>
                            <Button
                                variant='contained'
                                color='warning'
                                onClick={() => handleDelete(tema._id)}
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

export default TemaList;
