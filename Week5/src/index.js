let now = new Date();
let h3 = document.querySelector("h3");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let hours = now.getHours();

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

h3.innerHTML = `${day} ${hours}:${minutes}`;

function getWeather(response) {
  let city = response.data.name;
  document.querySelector("#location").innerHTML = city;

  let temp = Math.round(response.data.main.temp);
  document.querySelector("#current-temp").innerHTML = temp;

  let description = response.data.weather[0].description;
  document.querySelector("#description").innerHTML = description;

  let minTemp = Math.round(response.data.main.temp_min);
  document.querySelector("#min-temp").innerHTML = minTemp;

  let maxTemp = Math.round(response.data.main.temp_max);
  document.querySelector("#max-temp").innerHTML = maxTemp;
}

function searchCity(city) {
  let apiKey = "f2cfad915dcee273a86b45e874d64e09";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(url).then(getWeather);
}

function searchPosition(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#enter-city");
  searchCity(cityInput.value);
}

let searchButton = document.querySelector("#city");
searchButton.addEventListener("submit", searchPosition);

function currentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "f2cfad915dcee273a86b45e874d64e09";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(getWeather);
}

function currentLocation() {
  navigator.geolocation.getCurrentPosition(currentPosition);
}

let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", currentLocation);
