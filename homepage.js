document.addEventListener('DOMContentLoaded', function() {
    //const axios = require('axios');

    async function fetchWeatherData(latitude, longitude,temperatureUnit = 'celsius') {
        try {
            const params = {
                latitude: latitude,
                longitude: longitude,
                current_weather: true,
                temperature_unit: temperatureUnit,
                timezone: 'Australia/Adelaide'
            }

            const url = 'https://api.open-meteo.com/v1/forecast';
            const queryString = new URLSearchParams(params).toString();
            const response = await fetch(`${url}?${queryString}`);
            const data = await response.json();    

            console.log('API response:', data);

            //process weather datta (current weather data)
            const weather = data.current_weather;

            if(!weather) {
                console.error('No current weather data returned.');
                alert('Failed to fetch current weather data.');
                return;
            }

            //Convert ISO timestamp to Date
            const currentTime = new Date(weather.time);
            const hours = currentTime.getHours();
            const isDay = hours >= 6 && hours < 18 ? 'Day' : 'Night';

            const weatherCondition = getWeatherCondition(weather.weathercode);

            // Update HTML elements
            document.getElementById('weather-text').innerText = 
                `It's ${weatherCondition.toLowerCase()} and ${weather.temperature}°C`;


            

            //Updating background based on time of day
            const body = document.body;
            if (isDay === 'Day') {
                body.classList.add('day');
                body.classList.remove('night');
            } else {
                body.classList.add('night');
                body.classList.remove('day');
            }

        }catch (error) {
            console.error('Error fetching weather data:', error);
            alert('Failed to fetch weather data. Please try again.');
        }
    }   

    function getWeatherCondition(code) {
        const map = {
            0: 'Clear',
            1: 'Mainly Clear',
            2: 'Partly Cloudy',
            3: 'Overcast',
            45: 'Fog',
            48: 'Depositing Rime Fog',
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
            71: 'Slight Snow',
            73: 'Moderate Snow',
            75: 'Heavy Snow',
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
        return map[code] || 'Unknown';
    }

    // Adelaide coordinates
   fetchWeatherData(-34.9285, 138.6007);

 



});