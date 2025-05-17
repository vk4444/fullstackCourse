import { useState, useEffect } from 'react'

import SearchBar from './components/SearchBar'
import countriesService from './services/countriesService'
import SearchResults from './components/SearchResults'

const App = () => {

  // states
  const [searchValue, setSearchValue] = useState('')
  const [countries, setCountries] = useState([])

  // fetches the countries from the API
  useEffect(() => {
    countriesService
      .getAll()
      .then(result => {
        setCountries(result)
      })
  }, [])
  
  

  // form handlers
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value)
  }

  return(
    <div>
      <SearchBar searchValue={searchValue} onChange={handleSearchChange}/>
      <SearchResults searchValue={searchValue} countries={countries} setSearchValue={setSearchValue}/>
    </div>
  )
}

export default App