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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}