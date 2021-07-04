import refs from './refs.js'
const { city, icon, desc, temp, hum, wind, weather, input, searchBtn } = refs

const weatherWiget = {
  api_key: `b17a2dddb01d7481fea6373f92c2e546`,
  query: 'London',
  base_url: `https://api.openweathermap.org`,
  getFetch() {
    let query_params = `/data/2.5/weather?q=${this.query}&appid=${this.api_key}`
    let url = this.base_url + query_params
    fetch(url)
      .then((response) => {
        // console.log(response.json())
        return response.json()
      })
      .then((data) => {
        console.log(data)
      })
      .catch((err) => {
        console.error(err.message)
      })
  },
}
weatherWiget.getFetch()
