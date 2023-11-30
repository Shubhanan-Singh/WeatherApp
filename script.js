const apiKey = "06d5fa999da3c4fb581cf5fcb09224fa";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  const errorElement = document.querySelector(".error");

  if (response.status == 404) {
    errorElement.style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    errorElement.style.display = "none"; // Hide the error message
    var data = await response.json();

    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    // Variables for day and night differentiation
    const weatherMain = data.weather[0].main;
    const observationTime = new Date(data.dt * 1000);
    const sunrise = new Date(data.sys.sunrise * 1000);
    const sunset = new Date(data.sys.sunset * 1000);
    const isDay = checkDayTime(observationTime, sunrise, sunset);

    // Icons for the weather conditions as per the API
    if (weatherMain == "Clouds") {
      weatherIcon.src = "animated/cloudy.svg";
    } else if (weatherMain == "Clear") {
      weatherIcon.src = isDay ? "animated/day.svg" : "animated/night.svg";
    } else if (weatherMain == "Rain") {
      weatherIcon.src = "animated/rainy-6.svg";
    } else if (weatherMain == "Drizzle") {
      weatherIcon.src = "animated/rainy-3.svg";
    } else if (weatherMain == "Mist") {
      weatherIcon.src = isDay ? "animated/cloudy-day-2.svg" : "animated/cloudy-night-2.svg";
      if (!isDay) {
        weatherIcon.src = "animated/cloudy-night.svg";
      }
    } else if (weatherMain == "Snow") {
      weatherIcon.src = "animated/snowy-6.svg";
    } else if (weatherMain == "Thunder") {
      weatherIcon.src = "animated/thunder.svg";
    }

    document.querySelector(".weather").style.display = "block";
  }
}

function checkDayTime(currentTime, sunriseTime, sunsetTime) {
  return currentTime >= sunriseTime && currentTime < sunsetTime;
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

// default city
checkWeather("jammu");
