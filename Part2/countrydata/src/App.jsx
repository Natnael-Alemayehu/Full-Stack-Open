import axios from "axios"
import { useState, useEffect } from "react"

const InputField = ({ onChange }) => {
  return (
    <>
      <input onChange={onChange} type="text" />
    </>
  )
}

const Detail = ({ country, id }) => {
  const languages = country.languages
  const langs = (languages) => {
    const items = []
    for (const lang in languages) {
      const item = languages[lang]
      items.push(
        <li>{item}</li>
      )
    }
    return items
  }
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>
        <div>capital {country.capital}</div>
        <div>area {country.area}</div>
      </div>
      <h2>languages</h2>
      <ul>
        {langs(languages)}
      </ul>

      <div >
        <img src={country.flags.png} alt="flag image" />
      </div>

    </div>

  )
}

const DisplayCountries = ({ filtered_countries }) => {
  console.log("filtered: ", filtered_countries)

  if (filtered_countries.length > 10) {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  }
  else if (10 > filtered_countries.length && filtered_countries.length > 1) {
    if (!filtered_countries) return null
    return (
      <div>
        {filtered_countries.map(country => {
          const id = country.latlng.join('') || Date.now().toString()
          return (
            <div key={id}>{country.name.common}</div>
          )
        },)}
      </div>
    )
  }
  else if (filtered_countries.length === 1) {
    if (!filtered_countries) return null
    return (
      <div>
        {filtered_countries.map(country => {
          const id = country.latlng.join('') || Date.now().toString()
          return (
            <Detail country={country} key={id} id={id} />
          )
        })
        }
      </div >
    )
  }
}

const App = () => {
  const [text, setText] = useState(null)
  const [countries, setCountries] = useState([])

  const ALL_URL = "https://studies.cs.helsinki.fi/restcountries/api/all"
  const NAME_URL = "https://studies.cs.helsinki.fi/restcountries/api/name"

  const handleChange = (event) => {
    setText(event.target.value)
  }


  useEffect(() => {
    console.log("Started...")
    axios
      .get(ALL_URL)
      .then(response => {
        const countriesList = response.data
        setCountries(countriesList)
        console.log("Finished.")
      })
  }, [])


  const filtered_countries = countries.filter(country => {
    return (
      country.name.common.toLowerCase().includes(text)
    )
  })
  return (
    <div>
      Find countries <InputField onChange={handleChange} />
      <DisplayCountries filtered_countries={filtered_countries} />
    </div>
  )
}

export default App  
