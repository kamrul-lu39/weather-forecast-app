import React from "react";
import { Card, Typography, Grid } from "@mui/material";
import "./../styles/Weather.css"; // ✅ Ensure CSS is imported

const getDayName = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { weekday: "long" });
};

const FiveDayForecast = ({ forecastData, convertTemp, isFahrenheit }) => {
  return (
    <>
      <Typography variant="h5" style={{ marginTop: "20px" }}>5-Day Forecast</Typography>
      <Grid container spacing={2} justifyContent="center" className="forecast-container">
        {forecastData.map((day) => (
          <Grid item key={day.date}>
            <Card className="weather-card">
              <Typography variant="h6" className="day-name">{getDayName(day.date)}</Typography>
              <Typography variant="subtitle2" className="date">{day.date}</Typography>
              <img src={day.day.condition.icon} alt="weather icon" />
              <Typography>{day.day.condition.text}</Typography>
              <Typography className="temp">
                🌡️ {convertTemp(day.day.maxtemp_c).toFixed(1)}°{isFahrenheit ? "F" : "C"} /
                {convertTemp(day.day.mintemp_c).toFixed(1)}°{isFahrenheit ? "F" : "C"}
              </Typography>
              <Typography className="humidity">💧 {day.day.avghumidity}% Humidity</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default FiveDayForecast;
