import { AppBar, Button, Container, Toolbar, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();

  return (
    <AppBar
      position="static"
      color="transparent"
      sx={{ paddingLeft: 0, paddingRight: 0 }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ paddingLeft: 0, paddingRight: 0 }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: 'none', color: '#eee' }}>
              Inicio
            </Link>
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/cursos')}
          >
            Cursos
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/temas')}
          >
            Temas
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
