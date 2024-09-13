const apiKey = "d969fc398b4ef2d40b3ecdf5e0ad568d";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);


    if (response.status == 404) {
        document.querySelector(".not").style.display = "city not found.";
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }else{
        var data = await response.json();
    


        console.log(data);

    
        document.querySelector(".city").innerHTML = data.name + "" + data.sys.country;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " Km/h";

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "Image/clouds.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "Image/clear.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "Image/rain.png";
        } else if (data.weather[0].main == "Snow") {
            weatherIcon.src = "Image/snow.png";
        } else if (data.weather[0].main == "Haze") {
         weatherIcon.src = "Image/haze.png";
        }else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "Image/mist.png";
        }else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "Image/drizzle.png";
        }else{
            document.querySelector(".error").innerHTML = "city not found";
            document.querySelector(".weather").style.display = "none";
            document.querySelector(".error").style.display = "block";
        }
    }

}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      searchBtn.click();
    }
});
