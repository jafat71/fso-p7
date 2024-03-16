/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  useEffect(() => {
    async function fetchData() {
      axios.get("https://studies.cs.helsinki.fi/restcountries/api/name/"+name)
      .then(setCountry)
      .catch(setCountry)
    }
    if (name) fetchData()
  },[name])

  return country
}

const Country = ({ country }) => {

  if (!country) {
    return null
  }
  
  if (country.status!=200) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name.common} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div> 
      <img src={country.data.flags.png} height='100' alt={`flag of ${country.data.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value);
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button type="submit">find</button>
      </form>
      <Country country={country} />
    </div>
  )
}

export default App