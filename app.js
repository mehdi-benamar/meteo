// API à utiliser => http://ip-api.com/json/
// api météo : https://api.openweathermap.org/data/2.5/weather?q=ville&appid=27e14d8a9c41f94dc2f512a282afb281&lang=fe&units=metric
//permet de récupérer automatiquement la ville de l'utilisateur

const svg = document.querySelector("#svg")
const temperature = document.querySelector("#temperature")
const city = document.querySelector("#city")
const minMax = document.querySelector("#minMax")

const svgWeather = {
  "Clear": "./assets/day.svg",
  "Clouds": "./assets/cloudy.svg",
  "Rain": "./assets/rainy.svg",
  "Drizzle": "./assets/rainy.svg",
  "Thunderstorm": "./assets/thunder.svg",
  "Snow": "./assets/snowy.svg",
}

async function getCityByIpAdress(){
  const response = await fetch(" https://api.bigdatacloud.net/data/client-ip ")
  const data = await response.json()
  return data
}

console.log(getCityByIpAdress())