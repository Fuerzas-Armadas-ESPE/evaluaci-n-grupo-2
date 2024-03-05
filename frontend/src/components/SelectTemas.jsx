import { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Chip } from '@mui/material';

function SelectTemas({ value, onChange }) {
  const [temas, setTemas] = useState([]);

  const loadTemas = async () => {
    try {
      const response = await fetch('http://localhost:3000/temas');
      if (!response.ok) {
        throw new Error('Failed to fetch temas');
      }
      const data = await response.json();
      setTemas(data);
    } catch (error) {
      console.error('Error fetching temas:', error);
    }
  };

  useEffect(() => {
    loadTemas();
  }, []);

  return (
    <FormControl fullWidth>
      <InputLabel id="temas-label" style={{ color: 'white' }}>
        Temas
      </InputLabel>
      <Select
        labelId="temas-label"
        id="temas-select"
        multiple
        value={value}
        onChange={onChange}
        renderValue={(selected) => (
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {selected.map((temaId) => (
              <Chip
                key={temaId}
                label={temas.find((tema) => tema._id === temaId)?.titulo}
                style={{ margin: '2px', backgroundColor: 'skyblue' }}
              />
            ))}
          </div>
        )}
      >
        {temas.map((tema) => (
          <MenuItem key={tema._id} value={tema._id}>
            {tema.titulo}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectTemas;
