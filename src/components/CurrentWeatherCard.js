import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const getFormattedDate = () => {
  const now = new Date();
  const dayName = now.toLocaleDateString("en-US", { weekday: "long" });
  const fullDate = now.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const time = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

  return { dayName, fullDate, time };
};

const CurrentWeatherCard = ({ weather, convertTemp, isFahrenheit }) => {
  const { dayName, fullDate, time } = getFormattedDate();

  return (
    <Card className="weather-card">
      <CardContent>
        <Typography variant="h6">{dayName}, {fullDate}</Typography>
        <Typography variant="subtitle2">🕒 {time}</Typography>
        <Typography variant="h5">{weather.location.name}, {weather.location.country}</Typography>
        <Typography variant="h6">{weather.current.condition.text}</Typography>
        <img src={weather.current.condition.icon} alt="weather icon" />
        <Typography variant="h4">
          {convertTemp(weather.current.temp_c).toFixed(1)}°{isFahrenheit ? "F" : "C"}
        </Typography>
        
        <Typography>💧 Humidity: {weather.current.humidity}%</Typography>
        <Typography>💨 Wind: {weather.current.wind_kph} km/h</Typography>
      </CardContent>
    </Card>
  );
};

export default CurrentWeatherCard;
