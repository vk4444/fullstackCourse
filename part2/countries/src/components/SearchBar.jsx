const SearchBar = ({searchValue, onChange}) => {
    return (
        <>
            <p>find countries <input value={searchValue} onChange={onChange}></input></p>
        </>
    )
}

export default SearchBar