function displayTemperature(response) {

  // City:
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = response.data.city;

  // Time
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  timeElement.innerHTML =   `<strong>Time:</strong> ${formatDate(date)}`;

  // Weather Condition:
  let conditionElement = document.querySelector("#weather-condition")
  conditionElement.innerHTML =  `<strong>Weather condtition:</strong> ${response.data.condition.description}`;

  // Humidity 
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `<strong>Humidity:</strong> ${response.data.temperature.humidity}%`;
  
  // Wind Speed
  const speedElement = document.querySelector("#speed");
  speedElement.innerHTML = `<strong>Wind speed:</strong> ${response.data.wind.speed}km/h`;

  // Temperature: 
  let temperatureElement = document.querySelector("#current-temperature-value");
  let temperature = Math.round(response.data.temperature.current);
  temperatureElement.innerHTML = temperature;

  // Temperature unit element
  let unitElement = document.querySelector("#current-temperature-unit");
  if (unitElement) {
    unitElement.style.display = "inline";
  }

  // Temperature Icon
  let iconElement = document.querySelector("#current-temperature-icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" alt="${response.data.condition.description}" />`; 
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;

  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);


