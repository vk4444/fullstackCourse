const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const helper = require('./test_helper.js')


beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[2])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[3])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all the notes are returned', async () => {
  const response = await api.get('/api/blogs')


  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('contains id as an identifying property', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.every(blog => blog.id), true)
})

test('when post method is called a note is added', async () => {

  const newBlog = {
    'title': 'Added through test',
    'author': 'test',
    'url': 'abcd.cz',
    'likes': 100,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
})

test('there is 0 likes when likes not specified in request', async () => {

  const newBlog = {
    'title': 'No likes',
    'author': 'test',
    'url': 'abcd.cz',
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const likes = response.body.likes
  assert.strictEqual(likes, 0)
})

test('gives bad request when title is not included', async () => {
  const newBlog = {
    'author': 'test',
    'url': 'abcd.cz',
    'likes': 10
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('gives bad request when url is not included', async () => {
  const newBlog = {
    'title': 'without url',
    'author': 'test',
    'likes': 10
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('tests the delete method', async () => {
  const blogsBeginning = await helper.blogsInDb()

  await api.delete(`/api/blogs/${blogsBeginning[0].id}`)

  const blogsEnd = await helper.blogsInDb()

  assert.strictEqual(blogsEnd.length, blogsBeginning.length - 1)
})

test('tests if the put method updates an object based on its id', async () => {
  const blogsBeginning = await helper.blogsInDb()

  const newBlog = {
    'likes': 50
  }

  const response = await api
    .put(`/api/blogs/${blogsBeginning[0].id}`)
    .send(newBlog)
    .expect(200)

  assert.strictEqual(response.body.likes, 50)
})

after(async () => {
  await mongoose.connection.close()
})