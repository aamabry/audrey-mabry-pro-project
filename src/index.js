function showWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#current-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  timeElement.innerHTML = formatDate(date);
  temperatureElement.innerHTML = Math.round(temperature);
  descriptionElement.innerHTML = response.data.condition.description;
  cityElement.innerHTML = response.data.city;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  iconElement.innerHTML = `<img src= "${response.data.condition.icon_url}"class="current-temperature-icon"/>`;

  getForecast(response.data.city);

}
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }
  
  return `${day} ${hours}:${minutes}`;
}
function searchCity(city) {
  let apiKey = "1b509431b344bbaa8c5fo44ef08bca6t";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  searchCity(searchInput.value);
}

function formatDay(timestamp){
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return days[date.getDay()];
}

function getForecast(city){
  let apiKey = "1b509431b344bbaa8c5fo44ef08bca6t";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response){
  
  let forecastHtml = "";
  

  response.data.daily.forEach(function (day, index) {
    if (index < 5){
    forecastHtml =
      forecastHtml +

      `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>
        <div class="weather-forecast-icon">
        <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
        </div>
        <div class="weather-forecast-temperatures">
        <div class="weather-forecast-temperature">
          <strong>${Math.round(day.temperature.maximum)}°</strong>
         <div class="weather-forecast-temperature">${Math.round(day.temperature.minimum)}°</div>
         </div>
         </div> 
      `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;

}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearchSubmit);

searchCity("New York");
displayForecast();
