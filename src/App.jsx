import { useState } from "react";
import "./App.css";

import clouds from "./assets/clouds.png";
import clear from "./assets/clear.png";
import drizzle from "./assets/drizzle.png";
import mist from "./assets/mist.png";
import rain from "./assets/rain.png";
import snow from "./assets/snow.png";

function App() {
  const API_KEY = "c4336c67251d407530501a4d61f5e5e1";
  const URL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const checkWeather = async () => {
    if (!city.trim()) return;

    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${URL}${city}&appid=${API_KEY}`);

      if (!response.ok) {
        throw new Error("City not found");
      }

      const weatherData = await response.json();
      setData(weatherData);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherImage = () => {
    if (!data) return "";

    const condition = data.weather[0].main;

    if (condition === "Clouds") return clouds;
    if (condition === "Clear") return clear;
    if (condition === "Drizzle") return drizzle;
    if (condition === "Mist") return mist;
    if (condition === "Rain") return rain;

    return snow;
  };

  return (
    <div className="main-wrapper">
      <div className="weather-container">
        <h1>Weather App</h1>

        <div className="search-box">
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <button onClick={checkWeather}>Search</button>
        </div>

        {loading && <p className="status">Loading...</p>}

        {error && <p className="error">{error}</p>}

        {data && (
          <div className="weather-card">
            <img src={getWeatherImage()} alt="weather" />

            <h2>{data.name}</h2>

            <h1>{data.main.temp}°C</h1>

            <p>{data.weather[0].main}</p>

            <div className="details">
              <p>Humidity: {data.main.humidity}%</p>
              <p>Wind: {data.wind.speed} km/h</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
