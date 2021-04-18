import axios from "axios";
import { WEATHER_API_URL } from "../constants";

export const searchWeather = async (city) => {
  const url = `${WEATHER_API_URL}/data/2.5/forecast?q=${city}&appid=${process.env.NEXT_PUBLIC_OWM_API_KEY}&units=metric&lang=pl`;
  const { data } = await axios.get(url);
  return data;
};
