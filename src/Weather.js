import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Container, TextField, Button, IconButton, Typography } from "@mui/material";
import { ThemeContext } from "./context/ThemeContext";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import CurrentWeatherCard from "./components/CurrentWeatherCard";
import TemperatureToggle from "./components/TemperatureToggle";
import HourlyTemperatureGraph from "./components/HourlyTemperatureGraph";
import FiveDayForecast from "./components/FiveDayForecast";
import "./styles/Weather.css"; // ✅ Ensure the correct path


const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [isFahrenheit, setIsFahrenheit] = useState(false);
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    if (API_KEY) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(null, latitude, longitude);
        },
        () => {
          fetchWeather(localStorage.getItem("lastCity") || "New York");
        }
      );
    }
  }, []);

  const fetchWeather = async (city = null, lat = null, lon = null) => {
    let url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city || `${lat},${lon}`}&days=5&aqi=no&alerts=yes`;
    const response = await axios.get(url);
    setWeather(response.data);
    localStorage.setItem("lastCity", city || response.data.location.name);
  };

  const handleSearch = () => city.trim() && fetchWeather(city);

  const convertTemp = (tempC) => (isFahrenheit ? (tempC * 9) / 5 + 32 : tempC);

  return (
    <Container className={`weather-container ${darkMode ? "dark-mode" : "light-mode"}`}>
      <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
        {darkMode ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
      <Typography variant="h4">🌤️ Weather Forecast</Typography>
      <TextField label="Enter City" value={city} onChange={(e) => setCity(e.target.value)} fullWidth />
      <Button variant="contained" color="primary" onClick={handleSearch}>Get Weather</Button>

      {weather && (
        <>
          <CurrentWeatherCard weather={weather} convertTemp={convertTemp} isFahrenheit={isFahrenheit} />
          <TemperatureToggle isFahrenheit={isFahrenheit} setIsFahrenheit={setIsFahrenheit} />
          <HourlyTemperatureGraph hourlyData={weather.forecast.forecastday[0].hour} />
          <FiveDayForecast forecastData={weather.forecast.forecastday} convertTemp={convertTemp} isFahrenheit={isFahrenheit} />
        </>
      )}
    </Container>
  );
};

export default Weather;
