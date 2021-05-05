let myAddress = "1972 Emily Drive Rolla, MO 64082";
let requestURL = `https://geocode.xyz/${myAddress}?json=1`;

$.ajax({
  url: requestURL,
  method: "GET",
}).then(function (response) {
  console.log(response);
});
//variable declaration
var userForm = document.querySelector("#submitForm");
var addressInput = document.querySelector("#addressArea");
var cityInput = document.querySelector("#cityArea");
var stateInput = document.querySelector("#stateArea");

//captures user address
var inputHandler = function (event) {
  event.preventDefault();
  var address = addressInput.value;
  var city = cityInput.value;
  var state = stateInput.value;
  console.log(address);
  console.log(city);
  console.log(state);
};

//event listener for form
userForm.addEventListener("submit", inputHandler);
