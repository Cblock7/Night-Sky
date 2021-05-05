function moveISS () {
    $.getJSON('http://api.open-notify.org/iss-now.json?callback=?', function(data) {
        var lat = data['iss_position']['latitude'];
        var lon = data['iss_position']['longitude'];

    
        iss.setLatLng([lat, lon]);
        isscirc.setLatLng([lat, lon]);
        map.panTo([lat, lon], animate=true);
    });
    setTimeout(moveISS, 5000); 
}

var map = L.map('liveMap').setView([0,0], 2);
var iss = L.marker([0, 0], ).addTo(map);
var isscirc = L.circle([0,0], 2200e3, {color: "#c22", opacity: 0.3, weight:1, fillColor: "#c22", fillOpacity: 0.1}).addTo(map); 

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar', attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);

moveISS();
//variable declaration
var userForm = document.querySelector("#submitForm");
var addressInput = document.querySelector("#addressArea");
var cityInput = document.querySelector("#cityArea");
var stateInput = document.querySelector("#stateArea");
var zipInput = document.querySelector("#zipArea");

//captures user address
var inputHandler = function (event) {
  event.preventDefault();
  var address = addressInput.value;
  var city = cityInput.value;
  var state = stateInput.value;
  var zip = zipInput.value;
  let requestAddress = `${address} ${city}, ${state} ${zip}`;
  return requestAddress;
};

//event listener for form
userForm.addEventListener("submit", function (event) {
  let requestAddress = inputHandler(event);
  let requestURL = `https://geocode.xyz/${requestAddress}?json=1`;
  getGeoData(requestURL);
});

function getGeoData(requestURL) {
  $.ajax({
    url: requestURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
  });
}
