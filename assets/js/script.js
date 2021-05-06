var ISSLat;
var ISSlong;
var userLat;
var userLong;
var userForm = document.querySelector("#submitForm");
var addressInput = document.querySelector("#addressArea");
var cityInput = document.querySelector("#cityArea");
var stateInput = document.querySelector("#stateArea");
var zipInput = document.querySelector("#zipArea");
var myIcon = L.icon({
  iconUrl: "./assets/imgs/ISS-Icon.png",
  iconSize: [50, 50],
  iconAnchor: [0, 0],
  popupAnchor: [0, 0],
});

function moveISS() {
  $.getJSON(
    "http://api.open-notify.org/iss-now.json?callback=?",
    function (data) {
      var lat = data["iss_position"]["latitude"];
      ISSLat = lat;
      var lon = data["iss_position"]["longitude"];
      ISSlong = lon;

      iss.setLatLng([lat, lon]);
      isscirc.setLatLng([lat, lon]);
      // map.panTo([lat, lon], (animate = true));
    }
  );
  setTimeout(moveISS, 5000);
}

var map = L.map("liveMap").setView([0, 0], 1);
var iss = L.marker([0, 0], { icon: myIcon }).addTo(map);
var isscirc = L.circle([0, 0], 2200e3, {
  color: "#c22",
  opacity: 0.0,
  weight: 0,
  fillColor: "#c22",
  fillOpacity: 0.0,
}).addTo(map);

var inputHandler = function (event) {
  event.preventDefault();
  var address = addressInput.value;
  var city = cityInput.value;
  var state = stateInput.value;
  var zip = zipInput.value;
  let requestAddress = `${address} ${city}, ${state} ${zip}`;
  return requestAddress;
};

function getGeoData(requestURL) {
  $.ajax({
    url: requestURL,
    method: "GET",

  })
    .then(function (response) {
      console.log(response);

      userLat = response.latt;
      userLong = response.longt;
      localStorage.setItem("userLat", userLat);
      localStorage.setItem("userLong", userLong);
      var userLoc = L.marker([0, 0]).addTo(map);
      userLoc.setLatLng([userLat, userLong]);
      location.reload();
    })
    .catch(function (response) {
      return;
    });
}

function pageLoad() {
  userLat = localStorage.getItem("userLat");
  userLong = localStorage.getItem("userLong");
  if (userLat == "undefined" || userLat == undefined) {
    return;
  } else {
    var userLoc = L.marker([0, 0]).addTo(map);
    userLoc.setLatLng([userLat, userLong]);
  }
}

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}", {
  foo: "bar",
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

moveISS();
pageLoad();
userForm.addEventListener("submit", function (event) {
  let requestAddress = inputHandler(event);
  let requestURL = `https://geocode.xyz/${requestAddress}?json=1`;
  getGeoData(requestURL);
});
