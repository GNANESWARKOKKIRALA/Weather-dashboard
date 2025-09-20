const apiKey = "cf0ff82ba9103681ca9275e5a229870f"; // Replace with your OpenWeatherMap API key
const searchBtn = document.getElementById("searchBtn");
const locationBtn = document.getElementById("locationBtn");

searchBtn.addEventListener("click", () => {
  const city = document.getElementById("cityInput").value;
  if (city) {
    getWeatherByCity(city);
  }
});

locationBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      getWeatherByCoords(latitude, longitude);
    });
  } else {
    alert("Geolocation not supported by this browser.");
  }
});

async function getWeatherByCity(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  fetchWeather(url);
}

async function getWeatherByCoords(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  fetchWeather(url);
}

async function fetchWeather(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    alert(error.message);
  }
}

function displayWeather(data) {
  document.getElementById("cityName").textContent = data.name;
  document.getElementById("temperature").textContent = `${data.main.temp} °C`;
  document.getElementById("condition").textContent = data.weather[0].description;
  document.getElementById("icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}
