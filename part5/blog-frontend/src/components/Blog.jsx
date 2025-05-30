import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs }) => {
  const [detailsShown, setDetailsShown] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLike = async () => {
    const updatedBlog = {
      user: blog.user,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      id: blog.id
    }

    await blogService.update(updatedBlog)

    const newBlogs = blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog)
    setBlogs(newBlogs)
  }

  const deleteNote = async () => {
    const id = blog.id
    await blogService.remove(id)
    const newBlogs = blogs.filter(blog => blog.id !== id)
    setBlogs(newBlogs)
  }

  if (!detailsShown) {
    return (
      <div style={blogStyle}>{blog.title} {blog.author} <button onClick={() => setDetailsShown(true)} className='blog'>view</button></div>
    )
  } else {
    return (
      <div style={blogStyle} className='blog'>
        <p>{blog.title}<button onClick={() => setDetailsShown(false)}>hide details</button></p>
        <p>{blog.url}</p>
        <p>{blog.likes} <button onClick={addLike}>like</button></p>
        <p>{blog.author}</p>
        <button onClick={deleteNote}>delete</button>
      </div>
    )
  }
}

export default Blog