import React, { useState, useEffect } from 'react';
import { 
  Search, MapPin, Droplet, Wind, Sun, CloudRain, Thermometer, 
  Compass, CloudSnow, CloudFog, AlertTriangle 
} from 'lucide-react';

const WeatherDashboard = () => {
  const [city, setCity] = useState('');
  const [savedCities, setSavedCities] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [airQuality, setAirQuality] = useState(null);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('metric');
  const [loading, setLoading] = useState(false);

  const API_KEY = '016a2b30ca738e6f0408bbcbf88d823c';

  const fetchWeatherData = async () => {
    if (!city) return;
    setLoading(true);

    try {
      const geoResponse = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
      );
      const geoData = await geoResponse.json();

      if (geoData.length === 0) {
        throw new Error('City not found');
      }

      const { lat, lon } = geoData[0];
      await fetchWeatherByCoords(lat, lon);

      setSavedCities(prev => {
        const updatedCities = prev.filter(c => c.toLowerCase() !== city.toLowerCase());
        return [city, ...updatedCities].slice(0, 5);
      });
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    setLoading(true);
    try {
      const currentResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`
      );
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`
      );
      const airQualityResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );

      const currentData = await currentResponse.json();
      const forecastData = await forecastResponse.json();
      const airQualityData = await airQualityResponse.json();

      setWeatherData(currentData);
      setCity(currentData.name);

      const dailyForecast = forecastData.list.filter((_, index) => index % 8 === 0);
      const hourlyData = forecastData.list.slice(0, 8).map(hour => ({
        time: new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        temp: Math.round(hour.main.temp),
        icon: hour.weather[0].icon
      }));

      setForecast(dailyForecast);
      setHourlyForecast(hourlyData);
      setAirQuality(airQualityData.list[0]);
      setError(null);
    } catch (err) {
      setError("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  const renderWeatherIcon = (iconCode) => {
    const iconMap = {
      '01d': <Sun className="w-16 h-16 text-yellow-500" />, // Clear Day
      '02d': <CloudRain className="w-16 h-16 text-blue-300" />, // Partly Cloudy Day
      '03d': <CloudFog className="w-16 h-16 text-gray-400" />, // Cloudy
      '04d': <CloudSnow className="w-16 h-16 text-blue-200" />, // Snowy
      '01n': <Sun className="w-16 h-16 text-blue-500" />, // Clear Night
    };
    return iconMap[iconCode] || <AlertTriangle className="w-16 h-16 text-gray-500" />;
  };

  const getAirQualityDescription = (aqi) => {
    const descriptions = {
      1: "Good",
      2: "Fair",
      3: "Moderate",
      4: "Poor",
      5: "Very Poor"
    };
    return descriptions[aqi] || "Unknown";
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => fetchWeatherByCoords(coords.latitude, coords.longitude),
        () => setError("Could not retrieve location")
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-6 flex justify-center items-center">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl p-8">
        <div className="flex mb-6">
          <input 
            type="text" 
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name" 
            className="flex-grow p-3 border rounded-l-lg"
            onKeyPress={(e) => e.key === 'Enter' && fetchWeatherData()}
          />
          <button 
            onClick={fetchWeatherData}
            disabled={loading}
            className={`
              ${loading ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'} 
              text-white px-6 rounded-r-lg transition flex items-center
            `}
          >
            <Search className="mr-2" /> {loading ? 'Loading...' : 'Search'}
          </button>
          <select 
            value={unit} 
            onChange={(e) => setUnit(e.target.value)}
            className="ml-4 p-3 border rounded-lg"
          >
            <option value="metric">°C</option>
            <option value="imperial">°F</option>
          </select>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            {error}
          </div>
        )}

        {weatherData && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <MapPin className="mr-2 text-blue-500" />
                <h2 className="text-2xl font-bold">{weatherData.name}, {weatherData.sys.country}</h2>
              </div>
              <div className="flex items-center justify-between">
                {renderWeatherIcon(weatherData.weather[0].icon)}
                <div>
                  <p className="text-4xl font-bold">{Math.round(weatherData.main.temp)}°</p>
                  <p className="text-gray-600 capitalize">{weatherData.weather[0].description}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">5-Day Forecast</h3>
              <div className="space-y-3">
                {forecast.map((day, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between bg-blue-50 p-3 rounded-lg"
                  >
                    <p className="font-semibold">
                      {new Date(day.dt * 1000).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                    {renderWeatherIcon(day.weather[0].icon)}
                    <div className="flex items-center">
                      <p className="mr-2">{Math.round(day.main.temp_max)}°</p>
                      <p className="text-gray-500">
