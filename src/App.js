import React, { useState, useEffect } from 'react';
import WeatherCard from './components/WeatherCard';
import './App.css';

const App = () => {
  // state לשמירת נתוני מזג האוויר
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);

  // רשימת הערים שלנו
  const cities = [
    { name: 'לונדון', englishName: 'London' },
    { name: 'אלסקה', englishName: 'Alaska' },
    { name: 'ניו יורק', englishName: 'New York' },
    { name: 'אילת', englishName: 'Eilat' }
  ];

  const API_KEY = '8ee633956bad6ae1965b557a94ecfcba';

  // פונקציה להבאת נתוני מזג האוויר
  const fetchWeatherData = async () => {
    try {
      const promises = cities.map(async (city) => {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city.englishName}&appid=${API_KEY}&units=metric&lang=he`
        );
        const data = await response.json();
        return {
          ...data,
          hebrewName: city.name
        };
      });

      const results = await Promise.all(promises);
      setWeatherData(results);
      setLoading(false);
    } catch (error) {
      console.error('שגיאה:', error);
      setLoading(false);
    }
  };

  // useEffect - מריץ את הפונקציה כשהדף נטען
  useEffect(() => {
    fetchWeatherData();
  }, []);

  if (loading) {
    return <div className="loading">טוען נתוני מזג אוויר...</div>;
  }

  return (
    <div className="App" dir="rtl">
      <h3 id="title">תחזית מסביב לעולם</h3>
      <div id="grid-container">
        {weatherData.map((weather, index) => (
          <WeatherCard key={index} weatherData={weather} />
        ))}
      </div>
    </div>
  );
};

export default App;