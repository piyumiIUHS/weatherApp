const apiKey = "d969fc398b4ef2d40b3ecdf5e0ad568d";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const oneCallUrl = "https://api.openweathermap.org/data/2.5/onecall?units=metric";

// Get DOM elements
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// Function to format the date as YYYY/MM/DD
function getFormattedDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
}

// Function to calculate the forecast dates and display them
function calculateForecastDates() {
    const today = new Date();
    const dateElements = [
        ".date-minus-3",
        ".date-minus-2",
        ".date-minus-1",
        ".date-today",
        ".date-plus-1",
        ".date-plus-2",
        ".date-plus-3"
    ];

    dateElements.forEach((selector, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() + (i - 3));
        document.querySelector(selector).innerText = getFormattedDate(date);
    });
}

// Function to fetch and display weather for the current day
async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (response.status === 404) {
            throw new Error("City not found");
        }
        const data = await response.json();
        const lat = data.coord.lat;
        const lon = data.coord.lon;

        // Update current weather details
        document.querySelector(".city").innerHTML = `${data.name}, ${data.sys.country}`;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " Km/h";

        setWeatherIcon(data.weather[0].main);

        // Fetch the forecast data (including past and future days)
        getForecast(lat, lon);
    } catch (error) {
        console.error("Error fetching weather data:", error.message);
        document.querySelector(".error").innerHTML = error.message;
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
}

// Function to fetch forecast data using One Call API
async function getForecast(lat, lon) {
    try {
        const response = await fetch(`${oneCallUrl}&lat=${lat}&lon=${lon}&appid=${apiKey}`);
        const data = await response.json();

        // Update the forecast for the past and future days
        const days = ["day-minus-3", "day-minus-2", "day-minus-1", "day-plus-1", "day-plus-2", "day-plus-3"];
        const forecastData = [...data.daily.slice(1, 4), ...data.daily.slice(0, 3)]; // Modify this based on the API response

        days.forEach((dayClass, i) => {
            const dayElement = document.querySelector(`.${dayClass}`);
            const dayData = forecastData[i];

            dayElement.querySelector(".temp").innerText = `${Math.round(dayData.temp.day)}°C`;
            dayElement.querySelector(".humidity").innerText = `${dayData.humidity}%`;
            dayElement.querySelector(".wind").innerText = `${dayData.wind_speed} Km/h`;
            setWeatherIcon(dayData.weather[0].main, dayElement.querySelector(".weather-icon"));
        });
    } catch (error) {
        console.error("Error fetching forecast data:", error.message);
    }
}

// Function to set the appropriate weather icon
function setWeatherIcon(weatherCondition, iconElement = weatherIcon) {
    const iconMap = {
        "Clouds": "Image/clouds.png",
        "Clear": "Image/clear.png",
        "Rain": "Image/rain.png",
        "Snow": "Image/snow.png",
        "Haze": "Image/haze.png",
        "Mist": "Image/mist.png",
        "Drizzle": "Image/drizzle.png"
    };

    iconElement.src = iconMap[weatherCondition] || "Image/default.png";
}

// Event listener for search button click
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
    calculateForecastDates(); // Call the function to update the dates
});

// Event listener for pressing "Enter" in search input
searchBox.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        searchBtn.click();
    }
});
