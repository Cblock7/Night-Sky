let myAddress = "1972 Emily Drive Rolla, MO 64082";
let requestURL = `https://geocode.xyz/${myAddress}?json=1`;

$.ajax({
  url: requestURL,
  method: "GET",
}).then(function (response) {
  console.log(response);
});
