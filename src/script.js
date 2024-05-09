function handleForm (event){
	event.preventDefault();
let searchInput = document.querySelector("#form-input");
let cityElement = document.querySelector("#main-city");
cityElement.innerHTML = searchInput.value;
};

let headerFormElement = document.querySelector("#header-form");
headerFormElement.addEventListener('submit', handleForm);