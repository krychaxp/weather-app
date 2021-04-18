import { timeOfDay } from "../constants";

const avg = (v) => {
  const avgValue = v.reduce((t, va) => t + va) / v.length;
  return Math.round(avgValue);
};

export const getTempByTimeOfDay = (splitedDays, time) => {
  return splitedDays.map(
    (v) => v.filter((va) => va.dt_txt.endsWith(time))[0]?.main.temp || null
  );
};

export const getMode = (list) => {
  const result = list
    .map((v) => v.main.temp)
    .reduce((p, n) => (p[n] ? p[n]++ : (p[n] = 1)) && p, {});
  const repeatedValues = [...new Set(Object.values(result))];
  if (repeatedValues.length == 1) {
    return null;
  }
  const maxi = Math.max(...repeatedValues);
  const mode = Object.entries(result).find(([_, val]) => val == maxi);
  return mode[0];
};

export const getChatData = (list, days) => {
  const splitedDays = days.map((day) =>
    list.filter((v) => v.dt_txt.startsWith(day))
  );
  return {
    humidity: splitedDays.map((v) => v.map((v) => v.main.humidity)).map(avg),
    morning: getTempByTimeOfDay(splitedDays, timeOfDay.morning),
    day: getTempByTimeOfDay(splitedDays, timeOfDay.day),
    night: getTempByTimeOfDay(splitedDays, timeOfDay.night),
    min: splitedDays.map((v) => Math.min(...v.map((va) => va.main.temp))),
    max: splitedDays.map((v) => Math.max(...v.map((va) => va.main.temp))),
    mode: getMode(list),
  };
};
