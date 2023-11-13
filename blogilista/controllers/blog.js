const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.get('/:id', (request, response) => {
  Blog
    .find({ _id:request.params.id })
    .then(blog => {
      response.json(blog)
    })
})

blogsRouter.delete('/:id', (request, response) => {
  console.log(request.params.id)
  Blog
    .deleteOne({ _id:request.params.id })
    .then(() => response.status(204).end())
})

blogsRouter.post('/', (request, response) => {
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

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = blogsRouter