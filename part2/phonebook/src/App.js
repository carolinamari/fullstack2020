import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phonebookService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setFilterName ] = useState('')
  const [ notificationMessage, setNotificationMessage ] = useState(null)
  const [ notificationStyle, setNotificationStyle ] = useState(null)

  const successStyle = {
    color: '#C4FF7A',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const errorStyle = {
    color: '#FF9674',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const addPerson = (event) => {
    event.preventDefault()
    const nameExists = persons.some(person => person.name === newName)

    if (nameExists) {
      const confirm = window.confirm(`${newName} is already added to phonebook. Replace the old number with a new one?`)

      if (confirm) {
        const p = persons.find(person => person.name === newName)
        const changedPerson = {...p, number: newNumber}

        phonebookService
          .update(p.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== p.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
            setNotificationStyle(successStyle)
            setNotificationMessage(`Updated ${returnedPerson.name}`)

            setTimeout(() => setNotificationMessage(null), 4000)
          })
          .catch(error => {
            console.log(error.response.data)
            setNotificationStyle(errorStyle)
            setNotificationMessage(error.response.data.error)
            setTimeout(() => setNotificationMessage(null), 4000)
          })
      }
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
          setNotificationStyle(successStyle)
          setNotificationMessage(`Added ${returnedPerson.name}`)

          setTimeout(() => setNotificationMessage(null), 5000)
        })
        .catch(error => {
          console.log(error.response.data)
          setNotificationStyle(errorStyle)
          setNotificationMessage(error.response.data.error)
          setTimeout(() => setNotificationMessage(null), 5000)
        })
    }
  }

  const deletePerson = (id) => {
    const p = persons.find(person => person.id === id)
    const confirmDelete = window.confirm(`Delete ${p.name}?`)

    if (confirmDelete) {
      phonebookService
        .deleteObject(id)
        .then(() => setPersons(persons.filter(person => person.id !== id)))
        .catch(error => {
          setNotificationStyle(errorStyle)
          setNotificationMessage(`Information of ${p.name} has already been removed from server.`, notificationStyle)
          setTimeout(() => setNotificationMessage(null), 4000)
          setPersons(persons.filter(person => person.id !== id))
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
      <Notification message={notificationMessage} messageStyle={notificationStyle} />
      <Filter value={filterName} handleChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm 
        handleSubmit={addPerson} newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange} 
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} handleClick={deletePerson} />
    </div>
  )
}

export default App
