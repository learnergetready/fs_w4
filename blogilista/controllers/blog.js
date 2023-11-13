const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.find({ _id:request.params.id })
  response.json(blog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.deleteOne({ _id:request.params.id })
  response.status(204).end()
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  if(!body.title || !body.url) {
    return response.status(400).end()
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  })

  const result = await blog.save()
  response.status(201).json(result)
})

blogsRouter.patch('/:id', async (request, response) => {
  const blogNow = await Blog.findByIdAndUpdate(request.params.id, request.body)
  response.json(blogNow)
})

module.exports = blogsRouter