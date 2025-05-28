const Message = ({ message }) => {
  if (message) {
    return(
      <div><p>{message}</p></div>
    )
  }

}

export default Message