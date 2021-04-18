import { useState } from "react";
import { Wrapper, WeatherWrapper } from "./index.styles";
import { Button, CircularProgress, TextField } from "@material-ui/core";
import { searchWeather } from "../../apis";
import { WeatherBox } from "../WeatherBox";
export const Form = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(false);
  const [loading, setLoading] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!city) {
      return;
    }
    try {
      setLoading(true);
      const result = await searchWeather(city);
      setWeatherData(result);
    } catch (error) {
      setWeatherData({ error: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper onSubmit={onSubmit}>
      <TextField
        label="City"
        margin="normal"
        variant="outlined"
        fullWidth
        required
        value={city}
        onChange={(e) => setCity(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
      >
        Search
      </Button>
      {loading && <CircularProgress color="inherit" />}
      <WeatherWrapper>
        <WeatherBox weatherData={weatherData} />
      </WeatherWrapper>
    </Wrapper>
  );
};
