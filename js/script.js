let daysOfWeek = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday']
let monthsOfYear= ["January","February","March","April","May","June","July","August","September","October","November","December"];
var todayP = document.getElementById('day1')
var tomorrowP = document.getElementById('day2')
var afterTomorrowP = document.getElementById('day3')
var todayDate = document.getElementById('day1-date')
var tomorrowDate = document.getElementById('day2-date')
var afterTomorrowDate = document.getElementById('day3-date')
var searchCities = document.getElementById('searchCities')


async function fetchWeatherData(cityWeather) {
    try {
      const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=36403605971946ef8ad214645232409&q=${cityWeather}&days=3`);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
}

async function time(data){
    var epoch1 = data.forecast.forecastday[0].date_epoch*1000
    var epoch2 = epoch1+86400000
    var epoch3 = epoch2+86400000
    date1 = new Date(epoch1);
    date2 = new Date(epoch2);
    date3 = new Date(epoch3);
    today(date1)
    tomorrow(date2)
    afterTomorrow(date3)
}

today = (date)=> {
    let day = date.getDay()
    let thisDay = daysOfWeek[day]
    let dayOfMonth = date.getDate()
    let thisMonth = monthsOfYear[date.getMonth()]
    todayP.innerHTML=thisDay
    todayDate.innerHTML=dayOfMonth+" "+thisMonth
}
tomorrow = (date) =>{
    let day = date.getDay()
    let thisDay = daysOfWeek[day]
    let dayOfMonth = date.getDate()
    let thisMonth = monthsOfYear[date.getMonth()]
    tomorrowP.innerHTML=thisDay
    tomorrowDate.innerHTML=dayOfMonth+" "+thisMonth
}
afterTomorrow = (date) =>{
    let day = date.getDay()
    let thisDay = daysOfWeek[day]
    let dayOfMonth = date.getDate()
    let thisMonth = monthsOfYear[date.getMonth()]
    afterTomorrowP.innerHTML=thisDay
    afterTomorrowDate.innerHTML=dayOfMonth+" "+thisMonth
}

async function display(data){
    document.getElementById('town-name').innerHTML=data.location.name
    let condition = data.current.condition.text
    document.getElementById('today-cond').innerHTML=condition
    let temp_c = Math.round(data.current.temp_c)
    let conditionImg1 = data.current.condition.icon
    let feelslike_c = data.current.feelslike_c
     document.getElementById('first-day').innerHTML=`
     <div class="d-flex align-items-center main-temp">
     <p id="temp_c" class="today-temp fw-bold ms-3">${temp_c}<sup>o</sup>C</p>
     <img id="conditionImg1" class="m-auto w-25" src="https:${conditionImg1}" alt="">
     </div>
     <div>
     <p class="ms-3">Feels like ${feelslike_c}<sup>o</sup>C</p>
     </div>
    `

    let chanceOfRain = data.forecast.forecastday[0].day.daily_chance_of_rain
    let wind_kph = data.current.wind_kph
    let wind_dir = data.current.wind_dir
    document.getElementById('rain-wind-direction').innerHTML=`
    <span class="d-flex rounded-start-3 w-25">
    <i class="condition-icon fa-solid fa-umbrella ms-3 me-2"></i>
    <p>${chanceOfRain}%</p>
  </span>
  <span class="d-flex w-25"">
    <i class="condition-icon fa-solid fa-wind me-2"></i>
    <p>${wind_kph}km/h</p>
  </span>
  <span class="d-flex w-50">
    <i class="condition-icon fa-regular fa-compass me-2"></i>
    <p>${wind_dir}</p>
  </span>
  `

    let maxtemp_c2 = data.forecast.forecastday[1].day.maxtemp_c
    let mintemp_c2 = data.forecast.forecastday[1].day.mintemp_c
    let condition2 = data.forecast.forecastday[1].day.condition.text
    let conditionImg2 = data.forecast.forecastday[1].day.condition.icon
    document.getElementById('second-day').innerHTML=`
    <img src="https:${conditionImg2}" class="other-days-condition-img mt-5 mb-2">
    <p class="text-white fs-4 fw-bold">${maxtemp_c2}<sup>o</sup>C</p>
    <p>${mintemp_c2}<sup>o</sup>C</p>
    <p class="condition">${condition2}</p>`;
    
    let maxtemp_c3 = data.forecast.forecastday[2].day.maxtemp_c
    let mintemp_c3 = data.forecast.forecastday[2].day.mintemp_c
    let condition3 = data.forecast.forecastday[2].day.condition.text
    let conditionImg3 = data.forecast.forecastday[2].day.condition.icon
    document.getElementById('third-day').innerHTML=`
    <img src="https:${conditionImg3}"  class="other-days-condition-img mt-5 mb-2">
    <p class="text-white fs-4 fw-bold">${maxtemp_c3}<sup>o</sup>C</p>
    <p>${mintemp_c3}<sup>o</sup>C</p>
    <p class="condition">${condition3}</p>`

    time(`${searchCities.value}`)
}

function searchCity(){
    if(validateString(searchCities.value)===true){
        fetchWeatherData(searchCities.value)
        .then(data => {
        time(data);
        display(data)
    })
.catch(error => {
  console.error('Failed to fetch weather data:', error);
});
    }
}

function startUp(){
 fetchWeatherData('doha')
        .then(data => {
        time(data);
        display(data)
    })
.catch(error => {
  console.error('Failed to fetch weather data:', error);
});
}

startUp()

function validateString(inputString) {
  if (inputString.length >= 3) {
    return true;
  } else {
    return false;
  }
}

