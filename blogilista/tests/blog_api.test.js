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
describe('initial checks', () => {
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
})
describe('POST', () => {
  test('a blog can be added', async () => {
    const newBlog =
    { title: 'This blog',
      author: 'This guy',
      url: 'http://localhost:3001/thisURL',
      likes: 6 }

    await api
      .post('/api/blogs',)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const titles = response.body.map(b => b.title)
    expect(titles).toContain('This blog')
  })

  test('if likes not defined, likes = 0', async() => {
    const newBlog =
    { title: 'This blog',
      author: 'This guy',
      url: 'http://localhost:3001/thisURL'
    }

    await api
      .post('/api/blogs',)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const newBlogFromDB = response.body.find(b => b.title === 'This blog')

    expect(newBlogFromDB.likes).toBe(0)
  })

  test('missing title returns 400', async () => {
    const newBlog =
    { author: 'This guy',
      url: 'http://localhost:3001/thisURL'
    }

    await api
      .post('/api/blogs',)
      .send(newBlog)
      .expect(400)
  })

  test('missing url returns 400', async () => {
    const newBlog =
    { title: 'This blog',
      author: 'This guy'
    }

    await api
      .post('/api/blogs',)
      .send(newBlog)
      .expect(400)
  })
})

describe('DELETE', () => {
  test('a blog by id', async () => {
    const firstBlogsResponse = await api.get('/api/blogs')
    const idToDelete = firstBlogsResponse.body[0].id

    await api.delete(`/api/blogs/${idToDelete}`)
      .expect(204)

    const blogsAgainResponse = await api.get('/api/blogs')
    const ids = blogsAgainResponse.body.map(blog => blog.id)
    expect(ids).not.toContain(idToDelete)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})