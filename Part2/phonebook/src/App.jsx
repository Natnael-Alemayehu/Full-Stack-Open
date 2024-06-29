import { useState } from 'react'

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