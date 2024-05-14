function updateWeather(response) {
  let temperatureMain = document.querySelector("#main-temperature");
  temperatureMain.innerHTML = Math.round(response.data.temperature.current);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;

  let conditionElement = document.querySelector("#conditions");
  conditionElement.innerHTML = response.data.condition.description;

  let humidValue = document.querySelector("#humid-value");
  humidValue.innerHTML = `${response.data.temperature.humidity}%`;

  let windSpeed = document.querySelector("#wind-speed-value");
  windSpeed.innerHTML = `${response.data.wind.speed} km/h`;

  let timeElement = document.querySelector("#current-time");
  let date = new Date(response.data.time * 1000);
  timeElement.innerHTML = formatDate(date);

  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img
                class="weather-icon"
                id="weather-icon"
                src="${response.data.condition.icon_url}"
                alt="weather-icon"
              />`;
}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();

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
  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "1ad00cd57fae02a14f050bfc3o387tf2";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function handleForm(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#form-input");

  searchCity(searchInput.value);
}

function displayForecast() {
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
			<div class="row">
				<div class="col-2 forecast-item">
					<div class="weather-forecast-day">${day}</div>
					<img
						src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-night.png"
						alt="forecast-icon"
						width="40"
					/>
					<div class="weather-forecast-temp">
						<span class="weather-forecast-temp-max">22°</span>
						<span class="weather-forecast-temp-min"> 10°</span>
					</div>
				</div>
			</div>
		`;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let headerFormElement = document.querySelector("#header-form");
headerFormElement.addEventListener("submit", handleForm);

searchCity("Ottawa");
displayForecast();
