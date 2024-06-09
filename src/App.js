import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";
import Header from './components/Header';
import WeatherComponent from './components/WeatherComponent';
import axios from 'axios';
import Forecast from './components/Forecast';
import { Loader } from 'semantic-ui-react';
import RainAnimation from './components/RainAnimation';
import CloudAnimation from './components/CloudAnimation';


function App() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [city, setCity] = useState('');
  const [temprature, setTemprature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [sunrise, setSunrise] = useState(null);
  const [sunset, setSunset] = useState(null);
  const [icon, setIcon] = useState('');
  const [forcast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState('');

   // Effect to get the user's location
   useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  // Effect to fetch weather data once coordinates are available
  useEffect(() => {
    if (latitude && longitude) {
      axios
      .get(`${process.env.REACT_APP_API_URL}/weather?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
        .then((weatherData) => {
          setLoading(false)
          setTemprature(weatherData.data.main.temp);
          setSunset(weatherData.data.sys.sunset)
          setSunrise(weatherData.data.sys.sunrise)
          setHumidity(weatherData.data.main.humidity)
          setCity(weatherData.data.name)
          setIcon(weatherData.data.weather[0].main)
          setDescription(weatherData.data.weather[0].description)
        })
        .catch((error) => {
          setLoading(false);
          console.error('Error fetching weather data:', error);
        });

        axios
        .get(`${process.env.REACT_APP_API_URL}/forecast/?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
          .then((forecastData) => {
            setForecast(forecastData)
          });
        
    }
  }, [latitude, longitude]);
  return (
    <div className="main">
      <Header />
      {loading ? (
        <div>
          <p>Loading...Please Wait</p>
          <p>Getting stucked ? Allow the access of your location (required)</p>
          <Loader active inline='centered' />
        </div>
      ) : (
        <WeatherComponent
          temprature={temprature}
          humidity={humidity}
          sunrise={sunrise}
          sunset={sunset}
          city={city}
          icon={icon}
          description={description}
        />
      )}
      <Forecast forcast={forcast} />
    </div>
  );
}

export default App;


