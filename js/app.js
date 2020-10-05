//Accessing the DOM
const searchInput = document.getElementById("search");
const form = document.querySelector(".search");
const searchBtn = document.querySelector(".search__button");
const errorMsg = document.querySelector(".error-message");
const preloader = document.querySelector(".preloader");

//Details Data
const ipAddress = document.getElementById("ip-address");
const timeZone = document.getElementById("time-zone");
const region = document.getElementById("location");
const isp = document.getElementById("isp");
const ispInfo = document.querySelector(".isp__info");

const API_KEY = "at_7Oso1FsJjRiGPmrL9psu3X9Qe6vHV";
let map;

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    getRequest(searchInput.value);
    searchInput.value = "";
  });
}

const defaultRequest = async () => {
  let url = "https://ipapi.co/json/";
  const response = await fetch(url);
  const data = await response.json();
  console.log(data.ip);
  getRequest(data.ip);
};

const getRequest = async (ip_address) => {
  let url = `https://geo.ipify.org/api/v1?apiKey=${API_KEY}&ipAddress=${ip_address}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);

  if (ip_address !== data.ip) {
    errorMsg.textContent = `Invalid IP Address!`;
  } else {
    errorMsg.textContent = "";
  }

  //Latitude and Longitude
  let lat = data.location.lat;
  let lng = data.location.lng;

  //Details Data
  ipAddress.textContent = data.ip;
  timeZone.textContent = data.location.timezone;
  region.innerHTML = `${data.location.region}, ${data.location.city}<br>${data.location.geonameId}`;
  isp.textContent = data.isp;
  ispInfo.innerHTML = `ISP: ${data.as.name}, ${data.as.route}, ${data.as.domain}`;

  // Map
  renderMap(lat, lng);
};

const renderMap = (lat, lng) => {
  if (map) {
    map.remove();
  }
  map = L.map("map").setView([lat, lng], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker([lat, lng]).addTo(map).bindPopup("IP Address Location").openPopup();
};

defaultRequest();

window.addEventListener("load", () => {
  preloader.classList.add("hide-preloader");
});
