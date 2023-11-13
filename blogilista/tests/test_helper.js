const User = require('../models/user')
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

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
}