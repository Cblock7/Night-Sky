var ISSLat;
var ISSlong;
var userLat;
var userLong;
var ISSDistLoc;
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
var map = L.map("liveMap").setView([0, 0], 1);
var iss = L.marker([0, 0], { icon: myIcon }).addTo(map);

function moveISS() {
  $.getJSON(
    "http://api.open-notify.org/iss-now.json?callback=?",
    function (data) {
      var lat = data["iss_position"]["latitude"];
      ISSLat = lat;
      var lon = data["iss_position"]["longitude"];
      ISSlong = lon;
      ISSDistLoc = L.latLng(ISSLat, ISSlong);

      iss.setLatLng([lat, lon]);
      map.panTo([lat, lon], (animate = true));

      var userDistLoc = L.latLng(userLat, userLong);
      var ISSDistLoc = L.latLng(lat, lon);
      // console.log(userDistLoc) //works
      // console.log(ISSDistLoc) //works

      // calculates the distance between users location and ISS location and displays it on the page
      var distanceBetween = Math.round(
        userDistLoc.distanceTo(ISSDistLoc) / 1609
      );
      // console.log(distanceBetween) //works
      $("#station-distance").text(
        "Distance to ISS: " + distanceBetween + " miles!"
      );
    }
  );
  setTimeout(moveISS, 5000);
}

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
