import React from 'react'
import Weather from './Weather'

const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <div>Capital: {country.capital}</div>
      <div>Population: {country.population}</div>

      <h3>Languages</h3>
      <ul>
        {country.languages.map(language => <li key={language.iso639_1}>{language.name}</li>)}
      </ul>
      <img src={country.flag} alt='Flag' width='50%'/>

      <h3>Weather in {country.capital}</h3>
      <Weather capital={country.capital} />
    </div>
  )
}

export default Country