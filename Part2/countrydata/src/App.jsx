import axios from "axios"
import { useState, useEffect } from "react"

const API_KEY = import.meta.env.VITE_API_KEY

const InputField = ({ onChange }) => {
  return (
    <>
      <input onChange={onChange} type="text" />
    </>
  )
}
const Detail = ({ country }) => {
  const [weather, setWeather] = useState(null)
  const languages = country.languages
  const langs = (languages) => {
    const items = []
    for (const lang in languages) {
      const item = languages[lang]
      items.push(
        <li key={lang}>{item}</li>
      )
    }
    return items
  }
  const [capital_lat, capital_lng] = country.capitalInfo.latlng;

  useEffect(() => {
    console.log("Getting data for weather");
    console.log(`URL: ${`https://api.openweathermap.org/data/2.5/weather?lat=${capital_lat}&lon=${capital_lng}&appid=${API_KEY}`}`);
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${capital_lat}&lon=${capital_lng}&appid=${API_KEY}`)
      .then(response => {
        console.log(response.data);
        const weather_data_obeject = response.data

        setWeather(weather_data_obeject)

        console.log("Weather Finished");
      })
  }, [])

  const icon = weather ? weather.weather[0].icon : "loading"
  console.log(icon);
  const weather_icon_url = `http://openweathermap.org/img/wn/${icon}@2x.png`
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
      <div>
        <h2>Weather in {country.capital}</h2>
        {
          weather ? (
            <>
              <p>temprature {weather.main.temp}</p>
              <img src={weather_icon_url} alt="" />
              <p>wind {weather.wind.speed}m/s</p>

            </>
          ) : (
            <p>Loading weather data</p>
          )
        }
      </div>

    </div>

  )
}

const ShowButton = ({ country }) => {
  const [showDetail, setShowDetail] = useState(false)
  const btn_style = {
    marginLeft: 10
  }

  const toggleDetail = () => {
    setShowDetail(!showDetail)
  }

  return (
    <>
      <button style={btn_style} onClick={toggleDetail}>{showDetail ? "Hide" : "Show"}</button>
      {showDetail && <Detail country={country} />}
    </>
  )
}

const DisplayCountries = ({ filtered_countries }) => {
  // console.log("filtered: ", filtered_countries)

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
            <div key={id}>{country.name.common}
              <ShowButton country={country} />
            </div>
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
