// API à utiliser => http://ip-api.com/json/
// api météo : https://api.openweathermap.org/data/2.5/weather?q=ville&appid=27e14d8a9c41f94dc2f512a282afb281&lang=fe&units=metric
//permet de récupérer automatiquement la ville de l'utilisateur

const svg = document.querySelector("#svg")
const temperature = document.querySelector("#temperature")
const city = document.querySelector("#city")
const minMax = document.querySelector("#minMax span")
const form = document.querySelector("#form")
const error = document.querySelector("#error")
const input = document.querySelector("input")

const svgWeather = {
  "Clear": "./assets/day.svg",
  "Clouds": "./assets/cloudy.svg",
  "Rain": "./assets/rainy.svg",
  "Drizzle": "./assets/rainy.svg",
  "Thunderstorm": "./assets/thunder.svg",
  "Snow": "./assets/snowy.svg",
  "Tornado": "./assets/tornado.svg",
  "Fog": "./assets/fog.svg",
  "Mist": "./assets/fog.svg",
  "Smoke": "./assets/fog.svg",
  "Haze": "./assets/fog.svg",
  "Dust": "./assets/fog.svg",
  "Sand": "./assets/fog.svg",
  "Ash": "./assets/fog.svg",
  "Squall": "./assets/fog.svg"
}

window.addEventListener("load", async () => {
  input.value = ""
  const {name, main, weather} = await getDataLocalWeather()
  displayHtml(name, weather, main)
})

form.addEventListener("submit", async (e) => {
  e.preventDefault()
  error.textContent = ""
  const {name, main, weather} = await researchCity(e.target.city.value)
  displayHtml(name, weather, main)
})

async function getIpAdress(){
  
    const response = await fetch("https://api.bigdatacloud.net/data/client-ip")
    const data = await response.json()
    return data  
}

async function getCity(){
  try{
    const ip = await getIpAdress()
    const response = await fetch(`https://ipapi.co/${ip.ipString}/json`)
    if(response.status === 200){
      return response.json()
    }

  }catch(e){
    console.log("Échec de l'obtention des coordonnées locales")
  }
}


async function getDataLocalWeather(){
  const {city} = await getCity()
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=27e14d8a9c41f94dc2f512a282afb281&lang=fr&units=metric`)
  const data = await response.json()
  return data
}


async function researchCity(city){
  try{
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=27e14d8a9c41f94dc2f512a282afb281&lang=fr&units=metric`)
    if(response.status === 200){
      return response.json()
    }else{
      throw new Error("Cette ville n'existe pas et/ou les températures ne sont pas disponibles")
    }

  }catch(e){
    error.textContent = "Cette ville n'existe pas"
  }
}


function displayHtml(name, weather, main){
  temperature.textContent = Math.round(main.temp) + "°"
  city.textContent = name
  svg.src = svgWeather[weather[0].main]
  minMax.textContent = `${Math.floor(main.temp_min)}°/${Math.ceil(main.temp_max)}°`
}