import { useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'

const CreateNewForm = (props) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')



  const handleSubmit = async (event) => {
    event.preventDefault()

    const response = await blogService.create({
      title: title,
      author: author,
      url: url
    })

    setAuthor('')
    setTitle('')
    setUrl('')

    props.setBlogs(props.blogs.concat(response))

    props.onSubmitSuccess()

    props.setMessage(`Blog: ${response.title} by ${response.author} was added`)
  }

  return(
    <form onSubmit={handleSubmit}>

      <div>
        <label>title: </label>
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <div>
        <label>author: </label>
        <input
          type="text"
          value={author}
          name="Title"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>

      <div>
        <label>url: </label>
        <input
          type="text"
          value={url}
          name="Title"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>

      <button type='submit'>create</button>
    </form>
  )
}

CreateNewForm.PropTypes = {
  setBlogs: PropTypes.func.isRequired,
  onSubmitSuccess: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired
}

export default CreateNewForm