import React from 'react'

const Filter = ({ value, handleChange }) => {
  return (
    <div>
      <b>Find countries: </b><input value={value} onChange={handleChange} /> 
    </div>  
  )
}

export default Filter