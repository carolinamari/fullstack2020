import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ capital }) => {
  const [ weather, setNewWeather ] = useState({
      current: {
        temperature: '',
        weather_icons: '',
        wind_speed: '',
        wind_dir: '' 
      }
  })
  
  useEffect(() => {
    const params = {
        access_key: process.env.REACT_APP_API_KEY,
        query: capital
    }
    axios
      .get(`http://api.weatherstack.com/current`, {params})
      .then(response => {
        console.log(response.data)
        setNewWeather(response.data)
      });
  }, [capital])

  return (
    <div>
      <div><b>Temperature: </b> {weather.current.temperature} °C</div>
      <div><img src={weather.current.weather_icons} alt='weather_icons' /></div>
      <div><b>Wind: </b> {weather.current.wind_speed} mph direction {weather.current.wind_dir}</div>
    </div>
  )
}

export default Weather