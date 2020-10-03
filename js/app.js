//Example Leaflet Map
var map = L.map("map").setView([51.505, -0.09], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

L.marker([51.5, -0.09])
  .addTo(map)
  .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
  .openPopup();

const searchInput = document.getElementById("search");
const searchBtn = document.querySelector(".search__button");

let IP_ADD = searchInput.value;

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(IP_ADD);
  searchInput.value = "";
});

const API_KEY = "at_7Oso1FsJjRiGPmrL9psu3X9Qe6vHV";
//const IP_ADD = "8.8.8.8";
//const API_URL = "https://geo.ipify.org/api/v1?";

const url = `https://geo.ipify.org/api/v1?apiKey=${API_KEY}&ipAddress=${IP_ADD}`;

const getRequest = async () => {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
};

//getRequest();
