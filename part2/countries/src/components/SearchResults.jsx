import CountryInfo from "./CountryInfo"

const SearchResults = ({searchValue, countries, setSearchValue}) => {
    
    const handleShow = (countryName) => {
        setSearchValue(countryName)
    }
    
    const matches = countries.filter(country => country.name.common.toLowerCase().includes(searchValue.toLowerCase()))
    if (matches.length == countries.length) {
        return (
            <p>Start searching using the searchbox</p>
        )
    } else if (matches.length == 0) {
        return (
            <p>No matches found</p>
        )
    } else if (matches.length > 10) {
        return (
            <p>Too many matches. Specify another filter.</p>
        )
    } else if (matches.length == 1) {
        return (
            <CountryInfo country={matches[0]}/>
        )
    } else {
        return (
            matches.map(match => (
                <p key={match.name.common}>
                    {match.name.common} 
                    <button onClick={() => handleShow(match.name.common)}>show</button>
                </p>
                ))
        )
    }
}

export default SearchResults