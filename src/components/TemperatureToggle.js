import React from "react";
import { Button } from "@mui/material";
import { SwapHoriz } from "@mui/icons-material";

const TemperatureToggle = ({ isFahrenheit, setIsFahrenheit }) => {
  return (
    <Button
      variant="outlined"
      color="secondary"
      onClick={() => setIsFahrenheit(!isFahrenheit)}
      startIcon={<SwapHoriz />}
      className="temperature-toggle"
    >
      Convert to {isFahrenheit ? "Celsius" : "Fahrenheit"}
    </Button>
  );
};

export default TemperatureToggle;
