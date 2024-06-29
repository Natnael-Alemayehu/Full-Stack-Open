import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: "0911201920" }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleChangeName = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleOnSubmit = (event) => {
    event.preventDefault()
    const personObj = {
      name: newName,
      number: newNumber
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
      <form onSubmit={handleOnSubmit}>
        <div>
          <div>
            Name: <input onChange={handleChangeName} />
          </div>
          <div>
            Number: <input onChange={handleChangeNumber} />
          </div>
          <div>Name Change: {newName}</div>
          <div>Number Change: {newNumber}</div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      {persons.map((person) => {
        return (
          <DisplayNames name={person.name} number={person.number} key={person.name} />
        )
      })}

    </div>
  )
}

export default App