// const searchInput = document.getElementById("search");
// const searchIcon = document.getElementById("icon");
// const ip = document.getElementById("ip");
// const userlocation = document.getElementById("location");
// const timezoneELemnt = document.getElementById("timezone");
// const ispElement = document.getElementById("isp");
// const mapContainer = document.getElementById("map");

// let ipAddress;
// let locations;
// let timezone;
// let isp;
// let lat;
// let lng;

// function updateDomStats() {
//   ip.innerText = ipAddress;
//   userlocation.innerText = locations;
//   timezoneELemnt.innerText = timezone;
//   ispElement.innerText = isp;
// }

// let apiKey;
// const fetchApiKey = async () => {
//   await fetch("http://localhost:8000/get_api_key/")
//     .then((response) => response.json())
//     .then((data) => {
//       apiKey = data.api_key;

//       // Now you can use apiKey in your JavaScript code
//       console.log("API Key:", apiKey);

//       // Your JavaScript code here
//     })
//     .catch((error) => console.log(error));
// };
// console.log("api key is ", apiKey);
// const searchIp = async () => {
//   let getIpUrl = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=8.8.8.8`;
//   const ipToSearch = searchInput.value;
//   if (ipToSearch) {
//     getIpUrl = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ipToSearch}`;
//   }
//   console.log("searching");
//   try {
//     const response = await fetch(getIpUrl);
//     const data = await response.json();
//     console.log(data);
//     ipAddress = data.ip;
//     locations = `${data.location.country} ${data.location.region}`;
//     timezone = data.location.timezone;
//     isp = data.isp;
//     lat = data.location.lat;
//     lng = data.location.lng;
//     updateDomStats();

//     // Destroy the existing map instance (if any)
//     if (mapContainer._leaflet_id) {
//       mapContainer._leaflet_id = null;
//     }
//     // Create and display the map
//     const map = L.map("map").setView([lat, lng], 13);
//     L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//       maxZoom: 19,
//       attribution:
//         '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
//     }).addTo(map);
//     const marker = L.marker([lat, lng]).addTo(map);
//     marker.bindPopup(locations).openPopup();
//   } catch (error) {
//     console.error("Error fetching IP location data:", error);
//   }
// };

// searchIcon.addEventListener("click", () => {
//   if (searchInput.value) {
//     searchIp();
//   } else {
//     console.log("Please provide an IP address");
//   }
// });

// // Initialize with a default IP
// searchIp();

// Function to fetch the API key
async function fetchApiKey() {
  try {
    const response = await fetch("http://localhost:8000/get_api_key/");
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data.api_key;
  } catch (error) {
    console.error("Error fetching API key:", error);
    throw error;
  }
}

// Function to fetch IP information
async function fetchIpInfo(ipAddress, apiKey) {
  const getIpUrl = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ipAddress}`;
  try {
    const response = await fetch(getIpUrl);
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching IP location data:", error);
    throw error;
  }
}

// Function to initialize the map
function initializeMap(lat, lng) {
  const map = L.map("map").setView([lat, lng], 13);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
  const marker = L.marker([lat, lng]).addTo(map);
  marker.bindPopup(locations).openPopup();
}

// DOM elements
const searchInput = document.getElementById("search");
const searchIcon = document.getElementById("icon");
const ip = document.getElementById("ip");
const userlocation = document.getElementById("location");
const timezoneELemnt = document.getElementById("timezone");
const ispElement = document.getElementById("isp");
const mapContainer = document.getElementById("map");

// Initialize variables
let ipAddress;
let locations;
let timezone;
let isp;

// Handle the search button click
searchIcon.addEventListener("click", async () => {
  const ipToSearch = searchInput.value;
  if (!ipToSearch) {
    console.log("Please provide an IP address");
    return;
  }

  try {
    const apiKey = await fetchApiKey();
    const data = await fetchIpInfo(ipToSearch, apiKey);

    ipAddress = data.ip;
    locations = `${data.location.country} ${data.location.region}`;
    timezone = data.location.timezone;
    isp = data.isp;

    // Update DOM elements
    ip.innerText = ipAddress;
    userlocation.innerText = locations;
    timezoneELemnt.innerText = timezone;
    ispElement.innerText = isp;

    // Initialize and display the map
    mapContainer.innerHTML = ""; // Clear previous map
    initializeMap(data.location.lat, data.location.lng);
  } catch (error) {
    // Handle the error
  }
});

// Initialize with a default IP
searchIcon.click();
