
const Contact = ({person, removalFunction}) => {
    return( 
        <>
            <p>{person.name} {person.number} <button onClick={() => removalFunction(person.id)}>delete</button></p>    
        </>
    )
}

export default Contact