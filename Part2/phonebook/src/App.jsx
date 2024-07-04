/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import personService from './services/person'

const Delete = (props) => {
  return (
    <button onClick={props.onDelete}>Delete</button>
  )
}

const Display = (props) => {
  return (
    <div>
      {props.name} {props.number}
      <Delete id={props.id} onDelete={props.onDelete} />
    </div>
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

const Persons = ({ personFilterObject, onDelete }) => {
  return (
    <>

      {personFilterObject.map((person) => {
        return (
          <Display name={person.name} number={person.number} key={person.id} onDelete={() => onDelete(person.id, person.name)} />
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

  const deletePerson = (id, name) => {
    const question = window.confirm(`Delete ${name}`)

    if (question) {
      personService
        .deletePerson(id)
        .then(
          setPersons(persons.filter(p => p.id !== id))
        )

    } else {
      console.log("No clicked");
    }

  }

  const handleOnSubmit = (event) => {
    event.preventDefault()
    const personObj = {
      name: newName,
      number: newNumber,
    }
    const nameExists = persons.some(person => person.name === newName)

    if (nameExists) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      personService
        .addPerson(personObj)
        .then(newpersonObject => {
          setPersons(persons.concat(newpersonObject))
        })
    }
  }

  const persons_hook = () => {
    personService
      .getPerson()
      .then(person => {
        setPersons(person)
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

      <Persons personFilterObject={filtered_persons_object} onDelete={deletePerson} />

    </div>
  )
}

export default App