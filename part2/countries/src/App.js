import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'


const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ filterValue, setFilterValue ] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise resolved')
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => setFilterValue(event.target.value)

  const countriesToShow = countries.filter(country => 
    country.name.toLowerCase().includes(filterValue.toLowerCase())
  )
  
  return (
    <div>
      <Filter value={filterValue} handleChange={handleFilterChange} />
      <Countries countries={countriesToShow} />
    </div>
  )
}

export default App;
