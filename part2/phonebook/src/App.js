import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phonebookService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setFilterName ] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const nameExists = persons.some(person => person.name === newName)

    if (nameExists) {
      window.alert(`${newName} is already added to phonebook`)
    } 

    else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      phonebookService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilterName(event.target.value)

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))

  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterName} handleChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm 
        handleSubmit={addName} newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange} 
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App
