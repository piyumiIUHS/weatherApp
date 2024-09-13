const apiKey = "d969fc398b4ef2d40b3ecdf5e0ad568d";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

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

// Function to fetch and display weather data for the current day
async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    
    if (response.status === 404) {
        document.querySelector(".error").innerHTML = "City not found";
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        const data = await response.json();
        console.log(data);

        // Display current date
        document.querySelector(".date-today").innerText = getFormattedDate(new Date());

        // Update weather details
        document.querySelector(".city").innerHTML = data.name + ", " + data.sys.country;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " Km/h";

        // Set the weather icon based on the weather type
        if (data.weather[0].main === "Clouds") {
            weatherIcon.src = "Image/clouds.png";
        } else if (data.weather[0].main === "Clear") {
            weatherIcon.src = "Image/clear.png";
        } else if (data.weather[0].main === "Rain") {
            weatherIcon.src = "Image/rain.png";
        } else if (data.weather[0].main === "Snow") {
            weatherIcon.src = "Image/snow.png";
        } else if (data.weather[0].main === "Haze") {
            weatherIcon.src = "Image/haze.png";
        } else if (data.weather[0].main === "Mist") {
            weatherIcon.src = "Image/mist.png";
        } else if (data.weather[0].main === "Drizzle") {
            weatherIcon.src = "Image/drizzle.png";
        } else {
            document.querySelector(".error").innerHTML = "City not found";
            document.querySelector(".weather").style.display = "none";
            document.querySelector(".error").style.display = "block";
        }
    }
}

// Event listener for search button click
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
    calculateForecastDates(); // Call the function to update the dates
});

// Event listener for pressing "Enter" in search input
searchBox.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        searchBtn.click();
    }
});
