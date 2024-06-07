import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText } from '@mui/material';

const WeatherDisplay = ({ weatherData }) => {
  return (
    <Paper style={{ padding: '20px', marginTop: '20px' }}>
      {weatherData ? (
        <List>
          <ListItem>
            <ListItemText
              primary={`City: ${weatherData.name}`}
              secondary={`Temperature: ${weatherData.main.temp} °C, Weather: ${weatherData.weather[0].description}`}
            />
          </ListItem>
        </List>
      ) : (
        <Typography variant="h6" align="center">
          No data available. Please search for a city.
        </Typography>
      )}
    </Paper>
  );
};

export default WeatherDisplay;
