var API_KEY = "at_R7KBcSjdFfOqr4OD9aG04nFQvzQJH";
var IP ;
var API_URL = "https://geo.ipify.org/api/v1?apiKey="; 


let onclickSpan = document.getElementById('clicksp');

var myIcon = L.icon({
  iconUrl: 'images/icon-location.svg',
  iconSize: [32, 37],
  iconAnchor: [25, 16]
});


var mymap = L.map('mapview').setView([0, 0], 13);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoia2xhcmV2aWJlcyIsImEiOiJja2x1eHF5Y3IwOHVpMndxbHZzcGZ5MWd0In0.ojM4gcMyO7knZrd6yEtQtg'
}).addTo(mymap);



const marker = L.marker([0, 0], {icon: myIcon}).addTo(mymap);




let Ipdisplay = document.getElementById('ipdisplay');
let Locationdisplay = document.getElementById('locationdisplay');
let Timezonedisplay = document.getElementById('timezonedisplay');
let Ispdisplay = document.getElementById('ispdisplay');



async function getUserIp(){

  const ipJsonFormat = await fetch('https:api.ipify.org/?format=json');
  const resp = await ipJsonFormat.json();
  IP = await resp.ip;

  // const usersGeoLocation = await fetch(API_URL+IP+"?access_key="+API_KEY);
  const usersGeoLocation = await fetch(API_URL+API_KEY+"&ipAddress="+IP);
  const respUserLocate = await usersGeoLocation.json();

  console.log(respUserLocate);

  latitude = await respUserLocate.location.lat;
  longitude = await respUserLocate.location.lng;

  Ipdisplay.innerHTML= respUserLocate.ip;
  Locationdisplay.innerHTML=respUserLocate.location.region;
  Timezonedisplay.innerHTML= respUserLocate.location.timezone;
  Ispdisplay.innerHTML= respUserLocate.isp;


  marker.setLatLng([latitude,longitude]);
  mymap.setView([latitude,longitude],13);

}

async function getUserGeoLocateFrIp(){

IP = document.getElementById('ipaddr').value;

console.log(IP)

const usersGeoLocation = await fetch(API_URL+API_KEY+"&ipAddress="+IP);
const respUserLocate = await usersGeoLocation.json();

console.log(respUserLocate);

latitude = await respUserLocate.location.lat;
longitude = await respUserLocate.location.lng;

Ipdisplay.innerHTML= respUserLocate.ip;
Locationdisplay.innerHTML=respUserLocate.location.region;
Timezonedisplay.innerHTML= respUserLocate.location.timezone;
Ispdisplay.innerHTML= respUserLocate.isp;


  marker.setLatLng([latitude,longitude]);
  mymap.setView([latitude,longitude],13);
}



document.addEventListener('DOMContentLoaded', async (event) => {
  
    getUserIp();

      });




onclickSpan.addEventListener('click', (event)=> {

  getUserGeoLocateFrIp()

});


     