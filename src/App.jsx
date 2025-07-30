import { useState } from "react";
import './App.css';



function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;


  const handleSearch = async () => {
    if (!city) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) throw new Error("City not found");
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };
  const getBackground = () => {
  if (!weather) return "bg-gradient-to-r from-blue-200 to-purple-300";
  switch (weather.weather[0].main) {
    case "Clear":
      return "bg-[url('/clear.jpg')]";
    case "Rain":
      return "bg-[url('/rain.jpg')]";
    case "Clouds":
      return "bg-[url('/clouds.jpg')]";
    default:
      return "bg-gradient-to-r from-blue-200 to-purple-300";
  }
};


  return (
    <div className={`min-h-screen flex flex-col items-center justify-center bg-cover bg-center p-4 ${getBackground()}`}>


      <h1 className="text-4xl font-bold mb-6 text-gray-800">Weather App</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-2 rounded border border-gray-300 outline-none shadow"
        />
        <button
          onClick={handleSearch}
          className="p-2 px-4 rounded bg-blue-500 text-white font-semibold shadow hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-gray-700">Loading...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {weather && (
        <div className="backdrop-blur-md bg-white/20 p-6 rounded-lg text-center w-80 shadow-lg border border-white/30">




          <h2 className="text-2xl font-bold text-gray-800">{weather.name}</h2>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="Weather Icon"
            className="mx-auto"
          />
          <p className="text-3xl font-semibold text-black-900">{weather.main.temp}°C</p>
          <p className="capitalize text-black-600">{weather.weather[0].description}</p>
          <p className="text-sm text-black-500">Humidity: {weather.main.humidity}%</p>
          <p className="text-sm text-black-500">Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
  
}

export default App;
