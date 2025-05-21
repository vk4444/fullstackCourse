const dummy = (blogs) => {
  if(blogs){
    return 1
  }
  return 1
}

const totalLikes = (blogs) => {
  const likesArr = blogs.map(blog => blog.likes)
  const likesSum = likesArr.reduce((sum, val) => sum += val)

  return likesSum
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  let maxBlog = blogs[0]
  let maxLikes = blogs[0].likes

  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].likes > maxLikes) {
      maxBlog = blogs[i]
      maxLikes = blogs[i].likes
    }
  }
  return JSON.parse(JSON.stringify(maxBlog))
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}