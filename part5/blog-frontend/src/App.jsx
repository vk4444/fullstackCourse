import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateNewForm from './components/createNewForm'
import Message from './components/Message'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const blogFormRef = useRef()

  // Get initial blogs
  useEffect(() => {
    blogService.getAll().then(fetchedBlogs => {
      // Create a new array and sort it
      const sortedBlogs = [...fetchedBlogs].sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogs)
    })
  }, [])

  // Handle user persistence
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  // Handle message timeout
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [message]) // Changed from [blogs] to [message]

  // Function to update blogs and sort them
  const updateBlogs = (newBlogs) => {
    const sortedBlogs = [...newBlogs].sort((a, b) => b.likes - a.likes)
    setBlogs(sortedBlogs)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('Wrong credentials')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogList = () => (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in </p>
      <button onClick={handleLogout}>logout</button>

      <Togglable buttonLabel='new note' ref={blogFormRef}>
        <CreateNewForm
          blogs={blogs}
          setBlogs={updateBlogs}
          setMessage={setMessage}
          onSubmitSuccess={() => blogFormRef.current.toggleVisibility()}
        />
      </Togglable>

      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          blogs={blogs}
          setBlogs={updateBlogs}
        />
      )}
    </div>
  )

  return (
    <>
      <Message message={message}/>
      {user === null ?
        loginForm() :
        blogList()
      }
    </>
  )
}

export default App