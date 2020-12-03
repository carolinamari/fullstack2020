import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import QueryResults from './components/QueryResults'


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
  const handleButtonClick = (event) => setFilterValue(event.target.id)

  const countriesToShow = countries.filter(country => 
    country.name.toLowerCase().includes(filterValue.toLowerCase())
  )
  
  return (
    <div>
      <Filter value={filterValue} handleChange={handleFilterChange} />
      <QueryResults countries={countriesToShow} handleClick={handleButtonClick} />
    </div>
  )
}

export default App;
