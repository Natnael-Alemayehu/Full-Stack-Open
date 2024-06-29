import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
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


  const fil_persons = persons.filter((person) => {
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

  const DisplayNames = (props) => {
    return (
      <div>{props.name} {props.number}</div>
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter shown with: <input onChange={handleChangeFilter} />
      </div>
      <h2>Add New</h2>

      <form onSubmit={handleOnSubmit}>
        <div>
          <div>
            Name: <input onChange={handleChangeName} />
          </div>
          <div>
            Number: <input onChange={handleChangeNumber} />
          </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      {fil_persons.map((person) => {
        return (
          <DisplayNames name={person.name} number={person.number} key={person.id} />
        )
      })}

    </div>
  )
}

export default App