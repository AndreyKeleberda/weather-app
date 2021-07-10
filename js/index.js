import refs from './refs.js'
const {
  city,
  icon,
  desc,
  temp,
  hum,
  wind,
  weather,
  input,
  searchBtn,
  form,
} = refs

const weatherWidget = {
  api_key: `b17a2dddb01d7481fea6373f92c2e546`,
  query: 'london',
  base_url: `https://api.openweathermap.org`,
  getFetch(searchValue) {
    let query_params = `/data/2.5/weather?q=${searchValue}&appid=${this.api_key}`
    let url = this.base_url + query_params
    fetch(url)
      .then((response) => {
        console.log(response)
        return response.ok ? response.json() : alert('Введие корректный запрос')
      })
      .then((data) => {
        console.log(data)
        createMarkUp(data)
        weather.classList.remove('loading')
      })
      .catch((err) => {
        console.error(err.message)
      })
  },
}

function createMarkUp(obj) {
  city.textContent = `Weather in ${obj.name}`
  temp.textContent = `${Math.round(obj.main.temp - 273.15)} °C`
  let iconImg = obj.weather[0].icon
  icon.src = `https://openweathermap.org/img/wn/${iconImg}.png`
  desc.textContent = obj.weather[0].description
  hum.textContent = `Humidity: ${obj.main.humidity}%`
  wind.textContent = `Wind speed: ${obj.wind.speed} km/h`
  document.body.style.backgroundImage =
    'url("https://source.unsplash.com/1600x900/? ' + obj.name + '")'
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
  let search = e.target.elements.search.value
  weatherWidget.getFetch(search)
  form.reset()
})
