import { useState, useEffect } from 'react'
import axios from 'axios'

const Display = (props) => {
  return (
    <div>{props.name} {props.number}</div>
  )
}
const Filter = (props) => {
  return (
    <div>Filter shown with:
      <input onChange={props.manageField} />
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.submit}>
      <div>
        <div>
          Name: <input onChange={props.changeName} />
        </div>
        <div>
          Number: <input onChange={props.changeNumber} />
        </div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ personFilterObject }) => {
  return (
    <>

      {personFilterObject.map((person) => {
        return (
          <Display name={person.name} number={person.number} key={person.id} />
        )
      })}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')

  const handleChangeName = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleChangeFilter = (event) => {
    setFilter(event.target.value)
  }

  const filtered_persons_object = persons.filter((person) => {
    return (
      person.name.includes(newFilter)
    )
  })

  const handleOnSubmit = (event) => {
    event.preventDefault()
    const personObj = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    const nameExists = persons.some(person => person.name === newName)

    if (nameExists) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat(personObj))
      setNewName("")
      setNewNumber("")
    }
  }

  const persons_hook = () => {
    console.log('Effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }

  useEffect(persons_hook, [])

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter manageField={handleChangeFilter} />

      <h2>Add New</h2>

      <PersonForm submit={handleOnSubmit}
        changeName={handleChangeName}
        changeNumber={handleChangeNumber}
      />


      <h2>Numbers</h2>

      <Persons personFilterObject={filtered_persons_object} />

    </div>
  )
}

export default App