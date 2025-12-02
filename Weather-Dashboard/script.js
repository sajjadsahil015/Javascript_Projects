'use strict';

// Configuration
const API_KEY = '7efcd0e0755a461a932103949250212'; // Replace with your OpenWeather API Key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const LOCAL_STORAGE_CITY_KEY = 'weather_dashboard_last_city';

// State
const state = {
    currentCity: null,
    isLoading: false,
    error: null
};

// Utilities
/**
 * Debounce function to limit the rate at which a function can fire.
 * @param {Function} func - The function to debounce.
 * @param {number} wait - The delay in milliseconds.
 * @returns {Function} - The debounced function.
 */
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

// Local Storage
const saveCityToStorage = (city) => {
    localStorage.setItem(LOCAL_STORAGE_CITY_KEY, city);
};

const getCityFromStorage = () => {
    return localStorage.getItem(LOCAL_STORAGE_CITY_KEY);
};

// API Interaction
/**
 * Fetches weather data from the API.
 * @param {string} city - The city name to search for.
 */
const fetchWeather = async (city) => {
    if (!city) return;
    
    state.isLoading = true;
    state.error = null;
    displayError(null); // Clear previous errors
    
    // Show loading state (optional enhancement)
    const searchBtn = document.getElementById('search-btn');
    const originalBtnText = searchBtn.textContent;
    searchBtn.textContent = 'Loading...';
    searchBtn.disabled = true;

    try {
        const currentWeatherUrl = `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
        const weatherResponse = await fetch(currentWeatherUrl);

        if (!weatherResponse.ok) {
            if (weatherResponse.status === 404) {
                throw new Error(`City "${city}" not found.`);
            } else if (weatherResponse.status === 401) {
                throw new Error('Invalid API Key. Please check your configuration.');
            } else {
                throw new Error('An error occurred while fetching current weather data.');
            }
        }

        const weatherData = await weatherResponse.json();
        state.currentCity = weatherData.name;
        displayCurrentWeather(weatherData);
        saveCityToStorage(state.currentCity); // Save city on successful fetch

        // Fetch forecast as well
        await fetchForecast(city);

    } catch (error) {
        console.error('Fetch error:', error);
        state.error = error.message;
        displayError(error.message);
        // Clear weather display on error
        document.getElementById('current-weather').innerHTML = '';
        document.getElementById('forecast-container').innerHTML = '';
    } finally {
        state.isLoading = false;
        searchBtn.textContent = originalBtnText;
        searchBtn.disabled = false;
    }
};

/**
 * Fetches 5-day forecast data from the API.
 * @param {string} city - The city name to search for.
 */
const fetchForecast = async (city) => {
    if (!city) return;

    try {
        const forecastUrl = `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
        const forecastResponse = await fetch(forecastUrl);

        if (!forecastResponse.ok) {
            // Error handling similar to fetchWeather, but specific to forecast
            if (forecastResponse.status === 404) {
                throw new Error(`Forecast for "${city}" not found.`);
            } else if (forecastResponse.status === 401) {
                throw new Error('Invalid API Key for forecast. Please check your configuration.');
            } else {
                throw new Error('An error occurred while fetching forecast data.');
            }
        }

        const forecastData = await forecastResponse.json();
        displayForecast(forecastData);

    } catch (error) {
        console.error('Forecast fetch error:', error);
        state.error = error.message;
        displayError(error.message);
        document.getElementById('forecast-container').innerHTML = ''; // Clear forecast on error
    }
};

// UI Logic
const displayCurrentWeather = (data) => {
    const container = document.getElementById('current-weather');
    if (!container) return;

    const { name, main, weather, wind, dt } = data;
    const date = new Date(dt * 1000).toLocaleDateString();
    const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

    container.innerHTML = `
        <div class="weather-card">
            <div class="weather-header">
                <h2>${name} (${date})</h2>
                <img src="${iconUrl}" alt="${weather[0].description}" class="weather-icon">
            </div>
            <div class="weather-details">
                <p>Temperature: ${main.temp.toFixed(1)}°C</p>
                <p>Humidity: ${main.humidity}%</p>
                <p>Wind Speed: ${wind.speed} m/s</p>
            </div>
        </div>
    `;
};

const displayForecast = (data) => {
    const container = document.getElementById('forecast-container');
    if (!container) return;

    // Filter to get one forecast per day, preferably around noon
    const dailyForecasts = data.list.filter((reading, index, arr) => {
        const date = new Date(reading.dt * 1000).toLocaleDateString();
        // Include first reading always. For subsequent readings, check if date changes
        if (index === 0) return true;
        const prevDate = new Date(arr[index - 1].dt * 1000).toLocaleDateString();
        return date !== prevDate;
    }).slice(0, 5); // Ensure we get exactly 5 days if possible

    let forecastHtml = '<h2 class="forecast-title">5-Day Forecast</h2><div class="forecast-grid">';
    
    dailyForecasts.forEach(day => {
        const date = new Date(day.dt * 1000).toLocaleDateString();
        const iconUrl = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
        forecastHtml += `
            <div class="forecast-card">
                <h3>${date}</h3>
                <img src="${iconUrl}" alt="${day.weather[0].description}" class="weather-icon">
                <p>Temp: ${day.main.temp.toFixed(1)}°C</p>
                <p>Humidity: ${day.main.humidity}%</p>
            </div>
        `;
    });
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

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    console.log('Weather Dashboard initialized');
    setupEventListeners();

    // Load last searched city on startup
    const lastCity = getCityFromStorage();
    if (lastCity) {
        fetchWeather(lastCity);
        document.getElementById('city-input').value = lastCity;
    }
});