const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Own blog',
    author: 'Themselves',
    url: 'http://hs.fi',
    likes: 0,
  },
  {
    title: 'Other blog',
    author: 'Someone',
    url: 'localhost:3001',
    likes: 1,
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as JSON', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})

test('a specific blog is within the returned blogs', async ()  => {
  const response = await api.get('/api/blogs')

  const titles = response.body.map( b => b.title)

  expect(titles).toContain('Own blog')
})

test('a specific blog has "id" field', async () => {
  const response = await api.get('/api/blogs')

  const blogs = response.body

  expect(blogs[0].id).toBeDefined()
})

afterAll(async () => {
  await mongoose.connection.close()
})