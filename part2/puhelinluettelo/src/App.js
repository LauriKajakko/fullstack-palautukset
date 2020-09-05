import React, { useState } from 'react'
import Person from './components/Person'

const App = () => {
  
  const [ persons, setPersons ] = useState([
    { id: 1,
      name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ showAll, setShowAll ] = useState(true)

  

  const addName = (event) =>{

    //prevent default action (refreshing the page)
    event.preventDefault()

    //create a person object which is added to persons on submit
    const personObj ={
      id: persons.length +1,
      name: newName
    }

    // !! concat so that the state isn't updated directly
    // !! concat creates a new table with the new obj and then copies
    setPersons(persons.concat(personObj))

    //reset the form
    setNewName('')

    console.log('clikedi', event.target)
  }

  const handleNoteChange = (event) => {
    console.log('handleri', event.target.value)
    setNewName(event.target.value) //keeps track of the text on the form
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
                    value={newName}
                    onChange={handleNoteChange}    
                />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <li key={person.id}>
            <Person name={person.name}/>
          </li>
          
        )}
      </ul>
    </div>
  )

}

export default App