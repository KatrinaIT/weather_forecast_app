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

	// let iconElement = querySelector("#weather-ivon");
	// iconElement.innerHTML = response.data.condition.icon;
}

function formatDate(date) {
	
	let hours = date.getHours();
	let minutes = date.getMinutes();

	let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	let day = days[date.getDay()];

	if(minutes < 0) {
		minutes = `0${minutes}`;
	}
	return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
let apiKey = "1ad00cd57fae02a14f050bfc3o387tf2";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(updateWeather);
};

function handleForm (event){
	event.preventDefault();
let searchInput = document.querySelector("#form-input");

searchCity(searchInput.value);
};

let headerFormElement = document.querySelector("#header-form");
headerFormElement.addEventListener('submit', handleForm);

searchCity("Ottawa");