const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username:1, name:1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.find({ _id:request.params.id }).populate('user', { username:1, name:1 })
  response.json(blog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.deleteOne({ _id:request.params.id })
  response.status(204).end()
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  console.log(request)
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if(!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.patch('/:id', async (request, response) => {
  const blogNow = await Blog.findByIdAndUpdate(request.params.id, request.body)
  response.json(blogNow)
})

module.exports = blogsRouter