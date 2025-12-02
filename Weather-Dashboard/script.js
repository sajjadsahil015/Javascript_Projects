'use strict';

// Configuration
const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';
const LOCAL_STORAGE_CITY_KEY = 'weather_dashboard_last_city';

// State
const state = {
    currentCity: null,
    isLoading: false,
    error: null
};

// Utilities
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

const getCityFromStorage = () => {
    return localStorage.getItem(LOCAL_STORAGE_CITY_KEY);
};

const saveCityToStorage = (city) => {
    localStorage.setItem(LOCAL_STORAGE_CITY_KEY, city);
};

// WMO Weather Code to OpenWeatherMap Icon Mapping
const getWeatherIcon = (code) => {
    const mapping = {
        0: '01d', // Clear sky
        1: '02d', // Mainly clear
        2: '03d', // Partly cloudy
        3: '04d', // Overcast
        45: '50d', // Fog
        48: '50d', // Depositing rime fog
        51: '09d', // Drizzle: Light
        53: '09d', // Drizzle: Moderate
        55: '09d', // Drizzle: Dense
        56: '09d', // Freezing Drizzle: Light
        57: '09d', // Freezing Drizzle: Dense
        61: '10d', // Rain: Slight
        63: '10d', // Rain: Moderate
        65: '10d', // Rain: Heavy
        66: '13d', // Freezing Rain: Light
        67: '13d', // Freezing Rain: Heavy
        71: '13d', // Snow fall: Slight
        73: '13d', // Snow fall: Moderate
        75: '13d', // Snow fall: Heavy
        77: '13d', // Snow grains
        80: '09d', // Rain showers: Slight
        81: '09d', // Rain showers: Moderate
        82: '09d', // Rain showers: Violent
        85: '13d', // Snow showers slight
        86: '13d', // Snow showers heavy
        95: '11d', // Thunderstorm: Slight or moderate
        96: '11d', // Thunderstorm with slight hail
        99: '11d'  // Thunderstorm with heavy hail
    };
    const iconCode = mapping[code] || '01d';
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

const getWeatherDescription = (code) => {
    const mapping = {
        0: 'Clear sky',
        1: 'Mainly clear',
        2: 'Partly cloudy',
        3: 'Overcast',
        45: 'Fog',
        48: 'Depositing rime fog',
        51: 'Light Drizzle',
        53: 'Moderate Drizzle',
        55: 'Dense Drizzle',
        56: 'Light Freezing Drizzle',
        57: 'Dense Freezing Drizzle',
        61: 'Slight Rain',
        63: 'Moderate Rain',
        65: 'Heavy Rain',
        66: 'Light Freezing Rain',
        67: 'Heavy Freezing Rain',
        71: 'Slight Snow Fall',
        73: 'Moderate Snow Fall',
        75: 'Heavy Snow Fall',
        77: 'Snow Grains',
        80: 'Slight Rain Showers',
        81: 'Moderate Rain Showers',
        82: 'Violent Rain Showers',
        85: 'Slight Snow Showers',
        86: 'Heavy Snow Showers',
        95: 'Thunderstorm',
        96: 'Thunderstorm with slight hail',
        99: 'Thunderstorm with heavy hail'
    };
    return mapping[code] || 'Unknown';
};

// API Interaction
const fetchWeather = async (city) => {
    if (!city) return;
    
    state.isLoading = true;
    state.error = null;
    displayError(null);
    
    const searchBtn = document.getElementById('search-btn');
    const originalBtnText = searchBtn.textContent;
    searchBtn.textContent = 'Loading...';
    searchBtn.disabled = true;
    const currentCityDisplay = document.getElementById('current-weather');
    const forecastDisplay = document.getElementById('forecast-container');

    try {
        // Step 1: Geocoding
        const geoUrl = `${GEOCODING_URL}?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
        const geoResponse = await fetch(geoUrl);
        
        if (!geoResponse.ok) throw new Error('Geocoding service unavailable.');
        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            throw new Error(`City "${city}" not found.`);
        }

        const { latitude, longitude, name, country } = geoData.results[0];
        state.currentCity = name;

        // Step 2: Weather Data (Current + Forecast)
        const weatherParams = new URLSearchParams({
            latitude: latitude,
            longitude: longitude,
            current: 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m',
            daily: 'weather_code,temperature_2m_max,temperature_2m_min',
            timezone: 'auto'
        });

        const weatherResponse = await fetch(`${WEATHER_URL}?${weatherParams.toString()}`);
        if (!weatherResponse.ok) throw new Error('Weather service unavailable.');
        const weatherData = await weatherResponse.json();

        // Display Data
        displayCurrentWeather(weatherData, name, country);
        displayForecast(weatherData);
        saveCityToStorage(name);

    } catch (error) {
        console.error('Fetch error:', error);
        state.error = error.message;
        displayError(error.message);
        if (currentCityDisplay) currentCityDisplay.innerHTML = '';
        if (forecastDisplay) forecastDisplay.innerHTML = '';
    } finally {
        state.isLoading = false;
        searchBtn.textContent = originalBtnText;
        searchBtn.disabled = false;
    }
};

// UI Logic
const displayCurrentWeather = (data, cityName, country) => {
    const container = document.getElementById('current-weather');
    if (!container) return;

    const current = data.current;
    const date = new Date().toLocaleDateString();
    const iconUrl = getWeatherIcon(current.weather_code);
    const description = getWeatherDescription(current.weather_code);

    container.innerHTML = `
        <div class="weather-card">
            <div class="weather-header">
                <h2>${cityName}, ${country} (${date})</h2>
                <img src="${iconUrl}" alt="${description}" class="weather-icon">
            </div>
            <div class="weather-details">
                <p>Condition: ${description}</p>
                <p>Temperature: ${current.temperature_2m.toFixed(1)}°C</p>
                <p>Humidity: ${current.relative_humidity_2m}%</p>
                <p>Wind Speed: ${current.wind_speed_10m} km/h</p>
            </div>
        </div>
    `;
};

const displayForecast = (data) => {
    const container = document.getElementById('forecast-container');
    if (!container) return;

    const daily = data.daily;
    // Open-Meteo returns arrays of values. We take the next 5 days (indices 1 to 5, since 0 is today)
    // Or 0 to 4 if we want to include today? User story says "5-day forecast", usually distinct from current.
    // Let's show next 5 days (1-5).
    
    let forecastHtml = '<h2 class="forecast-title">5-Day Forecast</h2><div class="forecast-grid">';
    
    for (let i = 1; i <= 5; i++) {
        if (!daily.time[i]) break; // Safety check

        const date = new Date(daily.time[i]).toLocaleDateString();
        const code = daily.weather_code[i];
        const maxTemp = daily.temperature_2m_max[i];
        const minTemp = daily.temperature_2m_min[i];
        const iconUrl = getWeatherIcon(code);
        const description = getWeatherDescription(code);

        forecastHtml += `
            <div class="forecast-card">
                <h3>${date}</h3>
                <img src="${iconUrl}" alt="${description}" class="weather-icon">
                <p>${description}</p>
                <p>High: ${maxTemp.toFixed(1)}°C</p>
                <p>Low: ${minTemp.toFixed(1)}°C</p>
            </div>
        `;
    }
    
    forecastHtml += '</div>';
    container.innerHTML = forecastHtml;
};

const displayError = (message) => {
    const errorContainer = document.getElementById('error-container');
    if (errorContainer) {
        if (message) {
            errorContainer.textContent = message;
            errorContainer.style.display = 'block';
        } else {
            errorContainer.style.display = 'none';
            errorContainer.textContent = '';
        }
    }
};

// Event Listeners
const setupEventListeners = () => {
    const searchBtn = document.getElementById('search-btn');
    const cityInput = document.getElementById('city-input');

    const handleSearch = () => {
        const city = cityInput.value.trim();
        if (city) {
            fetchWeather(city);
        }
    };

    searchBtn.addEventListener('click', handleSearch);

    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
};

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    console.log('Weather Dashboard initialized (Open-Meteo)');
    setupEventListeners();

    const lastCity = getCityFromStorage();
    if (lastCity) {
        fetchWeather(lastCity);
        document.getElementById('city-input').value = lastCity;
    }
});
