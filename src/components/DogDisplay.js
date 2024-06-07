// DogDisplay.js
import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

const DogDisplay = ({ dogImage }) => {
  return (
    <Paper style={{ padding: '20px', marginTop: '20px' }}>
      {dogImage ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <img src={dogImage} alt="Random Dog" style={{ maxWidth: '100%', maxHeight: '200px' }} />
        </Box>
      ) : (
        <Typography variant="h6" align="center">
          No dog image available.
        </Typography>
      )}
    </Paper>
  );
};

export default DogDisplay;
