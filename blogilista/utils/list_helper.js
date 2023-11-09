const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogOrBlogs) =>
  blogOrBlogs.likes || blogOrBlogs.reduce( (likes, blog) => likes+blog.likes, 0)

module.exports = {
  dummy,
  totalLikes
}