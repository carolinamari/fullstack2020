import React from 'react'
import Person from './Person'

const Persons = ({ persons, handleClick }) => {
  return (
    <div>
      {persons.map(person => <Person key={person.name} person={person} handleClick={() => handleClick(person.id)}/>)}
    </div>
  )
}

export default Persons