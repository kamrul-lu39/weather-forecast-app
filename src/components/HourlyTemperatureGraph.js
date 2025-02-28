import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Typography } from "@mui/material";

const HourlyTemperatureGraph = ({ hourlyData }) => {
  return (
    <>
      <Typography variant="h5" style={{ marginTop: "20px" }}>Hourly Temperature Trend</Typography>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={hourlyData}>
          <XAxis dataKey="time" tick={{ fontSize: 12 }} />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="temp_c" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default HourlyTemperatureGraph;
