import { memo } from "react";
import { WEATHER_API_URL } from "../../constants";
import { getChatData } from "../../utils";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export const Component = ({ weatherData }) => {
  if (!weatherData) {
    return null;
  }

  if (weatherData.error) {
    return "Cannot found that city";
  }
  const { list, city } = weatherData;
  const { name } = city;
  const days = [...new Set(list.map((v) => v.dt_txt.split(" ")[0]))];
  const chartData = getChatData(list, days);
  const options = {
    title: {
      text: `The next 5 days in ${name}`,
    },
    subtitle: {
      text: `Source: ${WEATHER_API_URL.replace(/https?:\/\/api\./, "")}`,
    },
    xAxis: {
      categories: days,
    },
    tooltip: {
      shared: true,
    },
    yAxis: [
      {
        labels: {
          format: "{value}°C",
          style: {
            color: Highcharts.getOptions().colors[2],
          },
        },
        title: {
          text: "Temperature",
          style: {
            color: Highcharts.getOptions().colors[2],
          },
        },
        tooltip: {
          valueSuffix: " °C",
        },
      },
      {
        // gridLineWidth: 0,
        title: {
          text: "Humidity",
          style: {
            color: Highcharts.getOptions().colors[0],
          },
        },
        labels: {
          format: "{value} %",
          style: {
            color: Highcharts.getOptions().colors[0],
          },
        },
        max: 100,
        min: 0,
        tooltip: {
          valueSuffix: " %",
        },
        opposite: true,
      },
    ],
    series: [
      {
        type: "area",
        yAxis: 1,
        name: "Humidity",
        data: chartData.humidity,
        tooltip: {
          valueSuffix: " %",
        },
      },
      {
        type: "line",
        yAxis: 0,
        name: "Max",
        data: chartData.max,
        tooltip: {
          valueSuffix: " °C",
        },
      },
      {
        type: "line",
        yAxis: 0,
        name: "Night",
        data: chartData.night,
        tooltip: {
          valueSuffix: " °C",
        },
      },
      {
        type: "line",
        yAxis: 0,
        name: "Day",
        data: chartData.day,
        tooltip: {
          valueSuffix: " °C",
        },
      },
      {
        type: "line",
        yAxis: 0,
        name: "Morning",
        data: chartData.morning,
        tooltip: {
          valueSuffix: " °C",
        },
      },
      {
        type: "line",
        yAxis: 0,
        name: "Min",
        data: chartData.min,
        tooltip: {
          valueSuffix: " °C",
        },
      },
    ],
  };

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={options} />
      <div>
        Mode value:{" "}
        {chartData.mode ? (
          <span>{chartData.mode} °C</span>
        ) : (
          <span>not exists</span>
        )}
      </div>
    </>
  );
};

export const WeatherBox = memo(Component);
