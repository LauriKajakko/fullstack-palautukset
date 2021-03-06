import React, { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Numbers from './components/Numbers'
import personService from './services/personService'
import Notification from './components/Notification'

const App = () => {
  
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ show, setShow ] = useState([])
  const [ notification, setNotification ] = useState(null)

  const handleNameChange = (event) => {
    setNewName(event.target.value) //keeps track of the text on the form
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
    let filtteri = event.target.value
    console.log('filter', filtteri)
    if(filtteri===null){
      setShow(persons)
    }else{
      setShow(persons.filter(person => person.name.toLowerCase().includes(filtteri)))
    }
  }
  const handleDelete = (id, name) => {

    if(window.confirm(`Delete "${name}"?`)){
    personService
      .deleteById(id)
      .then(response => {
        console.log('after delete responde: ', response)
        setMessage(`${name} deleted succesfully`)
        setTimeout(() =>{
          setMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage(`${name} was already deleted`)
        setTimeout(() =>{
          setErrorMessage(null)
        }, 5000)
      })

    personService
      .getAll()
      .then(response => {
          setPersons(response)
          setShow(response)
      })
    }
    
  }

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        console.log('response', response)
        setPersons(response)
        setShow(response)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification notification={notification} />

      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>

      <h3>add a new</h3>
      
      <PersonForm newName={newName} 
                  handleNameChange = {handleNameChange}
                  newNumber={newNumber}
                  handleNumberChange={handleNumberChange}
                  setNewName={setNewName}
                  setNewNumber={setNewNumber}
                  setPersons={setPersons}
                  persons={persons}
                  setShow={setShow}
                  setMessage={setMessage}
                  setErrorMessage={setErrorMessage}
      />

      <h2>Numbers</h2>
        <Numbers personsToShow={show} handler={handleDelete}/>
    </div>
  )

}

export default App