import React, { useState, useEffect } from 'react';
import WeatherCard from './components/WeatherCard';
import './App.css';

const App = () => {
  // State for storing weather data and loading status
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cities configuration with Hebrew and English names
  const cities = [
    { name: 'לונדון', englishName: 'London' },
    { name: 'אלסקה', englishName: 'Alaska' },
    { name: 'ניו יורק', englishName: 'New York' },
    { name: 'אילת', englishName: 'Eilat' }
  ];

  const API_KEY = '8ee633956bad6ae1965b557a94ecfcba';

  // Fetch weather data for all cities
  const fetchWeatherData = async () => {
    try {
      // Create promises for all API calls
      const promises = cities.map(async (city) => {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city.englishName}&appid=${API_KEY}&units=metric&lang=he`
        );
        const data = await response.json();
        
        // Add Hebrew name to the response data
        return {
          ...data,
          hebrewName: city.name
        };
      });

      // Wait for all API calls to complete
      const results = await Promise.all(promises);
      setWeatherData(results);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchWeatherData();
  }, []);

  // Show loading state
  if (loading) {
    return <div className="loading">טוען נתוני מזג אוויר...</div>;
  }

  return (
    <div className="App" dir="rtl">
      <h3 id="title">תחזית מסביב לעולם</h3>
      <div id="grid-container">
        {/* Render weather cards for each city */}
        {weatherData.map((weather, index) => (
          <WeatherCard key={index} weatherData={weather} />
        ))}
      </div>
    </div>
  );
};

export default App;