const Blog = require('../models/blog')

const initialBlogs = [
  {
    'title': 'My first blog',
    'author': 'Vojta',
    'url': 'antonybrtnik.cz',
    'likes': 10,
  },
  {
    'title': 'My second blog',
    'author': 'Vojta',
    'url': 'abcd.cz',
    'likes': 10,
  },
  {
    'title': 'My second blog',
    'author': 'Vojta',
    'url': 'abcd.cz',
    'likes': 10,
  },
  {
    'title': 'My second blog',
    'author': 'Vojta',
    'url': 'abcd.cz',
    'likes': 10,
  }
]

const blogsInDb = async () => {
  const notes = await Blog.find({})
  return notes.map(note => note.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb
}