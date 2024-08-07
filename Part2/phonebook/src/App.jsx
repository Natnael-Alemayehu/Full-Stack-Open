/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import personService from './services/person'

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }
  return (
    <div className={`notification ${type}`}>
      {message}
    </div>
  )
}

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
  const [notifications, setNotifications] = useState({ message: '', type: '' })

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

    }
  }

  const updatePerson = (id, personObj) => {
    const message_object = {
      message: `${personObj.name} has already been deleted`,
      type: "failure"
    }
    personService
      .updatePerson(id, personObj)
      .then(updatedPerson =>
        setPersons(persons.map(p => p.id !== id ? p : updatedPerson))
      ).catch(error => {
        setNotifications(Object.assign({}, message_object))
        setTimeout(() => {
          setNotifications({ message: '', type: '' })
        }, 3000);
      }
      )

  }

  const handleOnSubmit = (event) => {
    event.preventDefault()
    const personObj = {
      name: newName,
      number: newNumber,
    }
    const nameExists = persons.some(person => person.name === newName)
    if (nameExists) {
      const update_question = window.confirm(`${newName} is already added to phonebook do you want to update the number?`)
      if (update_question) {
        const id = persons.find(p => p.name === newName).id
        updatePerson(id, personObj)
      }
    }
    else {
      personService
        .addPerson(personObj)
        .then(newpersonObject => {
          setPersons(persons.concat(newpersonObject))
          const message_object = {
            message: `${personObj.name} has successfully been created`,
            type: "success"
          }
          setNotifications(Object.assign({}, message_object))
          setTimeout(() => {
            const def = { message: '', type: '' }
            setNotifications(Object.assign({}, def))
          }, 2000);
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
      <Notification message={notifications.message} type={notifications.type} />

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