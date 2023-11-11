const lodash = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogOrBlogs) =>
  blogOrBlogs.likes || blogOrBlogs.reduce( (likes, blog) => likes+blog.likes, 0)

const favoriteBlog = (blogs) => {
  if(blogs.likes) {
    return blogs
  } else {
    return blogs.reduce((favoriteBlog, blog) => blog.likes >= favoriteBlog.likes ? blog : favoriteBlog,{ likes:0 })
  }
}

const mostBlogs = (blogs) => {
  if(blogs.likes) {
    return { author: blogs.author, blogs: 1 }
  } else {
    const bloggers = lodash.countBy(blogs, (blog) => blog.author )
    const result = lodash.reduce(bloggers, (authorOfMost, authored, author) =>
      authored >= authorOfMost.blogs ? { author, blogs:authored }: authorOfMost, { blogs:0 })
    return (result)
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}