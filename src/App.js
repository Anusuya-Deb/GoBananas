import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, Card, CardContent, Button, Dialog, DialogTitle, DialogContent, DialogActions, Grid, Box } from '@mui/material';
import WeatherDisplay from './components/WeatherDisplay';
import SearchBar from './components/SearchBar';
import DogDisplay from './components/DogDisplay';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [openWeatherModal, setOpenWeatherModal] = useState(false);
  const [openDogModal, setOpenDogModal] = useState(false);
  const [dogImage, setDogImage] = useState(null);

  const handleSearch = async (event) => {
    event.preventDefault();
    const apiKey = 'd7280066598e97953ca5a7c7f669aabd';

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=metric&appid=${apiKey}`
      );
      setWeatherData(response.data);
      setOpenWeatherModal(true);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeatherData(null);
      setOpenWeatherModal(false);
    }
  };

  const handleDogSearch = async () => {
    try {
      const response = await axios.get('https://api.thedogapi.com/v1/images/search');
      const imageUrl = response.data[0].url;
      setDogImage(imageUrl);
      setOpenDogModal(true);
    } catch (error) {
      console.error('Error fetching dog image:', error);
      setDogImage(null);
      setOpenDogModal(false);
    }
  };

  const handleCloseWeatherModal = () => {
    setOpenWeatherModal(false);
  };

  const handleCloseDogModal = () => {
    setOpenDogModal(false);
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(to right, #74ebd5, #ACB6E5)',
      }}
    >
      <Typography variant="h1" align="center" style={{ color: '#ffeb3b', marginBottom: '20px' }}>GoBananas</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Card
              variant="outlined"
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderRadius: '15px',
                boxShadow: '0px 0px 20px 0px rgba(0,0,0,0.75)',
                overflow: 'hidden',
              }}
            >
              <CardContent style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                <Typography variant="h3" gutterBottom>
                  Weather Forecast
                </Typography>
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleSearch={handleSearch} />
              </CardContent>
            </Card>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Card
              variant="outlined"
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderRadius: '15px',
                boxShadow: '0px 0px 20px 0px rgba(0,0,0,0.75)',
                overflow: 'hidden',
              }}
            >
              <CardContent style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                <Typography variant="h3" gutterBottom>
                  Random Dog Face
                </Typography>
                <Button onClick={handleDogSearch} variant="outlined" sx={{ width: '100%', minHeight: '64px', marginTop: '10px' }}>Dog's Here</Button>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>

      <Dialog open={openWeatherModal} onClose={handleCloseWeatherModal} fullWidth maxWidth="sm">
        <DialogTitle sx={{ backgroundColor: '#5f9ea0', color: '#fff' }}>Weather Details</DialogTitle>
        <DialogContent>
          <WeatherDisplay weatherData={weatherData} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseWeatherModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDogModal} onClose={handleCloseDogModal} fullWidth maxWidth="sm">
        <DialogTitle sx={{ backgroundColor: '#5f9ea0', color: '#fff' }}>Random Dog Image</DialogTitle>
        <DialogContent>
          <DogDisplay dogImage={dogImage} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDogModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default App;
