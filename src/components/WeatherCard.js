import React from 'react';
import './WeatherCard.css';

const WeatherCard = ({ weatherData }) => {
  const { hebrewName, weather, main } = weatherData;
  const temperature = Math.round(main.temp);
  const feelsLike = Math.round(main.feels_like);
  const humidity = main.humidity;
  const description = weather[0].description;

  // בחירת תמונה לפי טמפרטורה מורגשת
  let imageWeather;
  if (feelsLike <= 20) {
    imageWeather = 'Snowflake Emoji.png'; // קר
  } else if (feelsLike >= 30) {
    imageWeather = 'The Sun Emoji.png'; // חם
  } else {
    imageWeather = 'Cloud Emoji.png'; // נעים
  }

  return (
    <div className="grid-item">
      <img className="Weather-image" src={imageWeather} alt="Weather image" />
      <div className="info">
        <h2>{hebrewName}</h2>
        <h4>{description}</h4>
        <table>
          <tr>
            <th>טמפ' נמדדת</th>
            <th>טמפ' מורגשת</th>
            <th>לחות</th>
          </tr>
          <tr>
            <td>{temperature}°C</td>
            <td>{feelsLike}°C</td>
            <td>{humidity}%</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default WeatherCard;