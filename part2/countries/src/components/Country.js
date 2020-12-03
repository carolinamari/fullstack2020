import React from 'react'

const Country = ({ country }) => {
  console.log(country.languages)
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
    </div>
  )
}

export default Country