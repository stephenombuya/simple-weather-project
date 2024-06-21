document.getElementById('searchBtn').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;
    getWeather(city);
});

async function getWeather(city) {
    const apiKey = '016a2b30ca738e6f0408bbcbf88d823c';  // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        document.getElementById('weatherDisplay').innerHTML = `<p>${error.message}</p>`;
    }
}

function displayWeather(data) {
    const weatherDiv = document.getElementById('weatherDisplay');
    weatherDiv.innerHTML = `
        <h2>Weather in ${data.name}</h2>
        <div class="weather-info">Temperature: ${data.main.temp} °C</div>
        <div class="weather-info">Weather: ${data.weather[0].description}</div>
        <div class="weather-info">Humidity: ${data.main.humidity} %</div>
        <div class="weather-info">Wind Speed: ${data.wind.speed} m/s</div>
    `;
}
