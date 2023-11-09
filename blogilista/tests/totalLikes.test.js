const listHelper = require('../utils/list_helper')

describe('total likes', () => {

  const someBlogs =
  [
    {
      '_id': '6548e70e158ea0e28419ced5',
      'title': 'Own blog',
      'author': 'Themselves',
      'url': 'http://hs.fi',
      'likes': 0,
      '__v': 0
    },
    {
      '_id': '6548e7ba748230defea4a7f0',
      'title': 'Own blog',
      'author': 'Themselves',
      'url': 'http://hs.fi',
      'likes': 0,
      '__v': 0
    },
    {
      '_id': '654a940dedfebae3af453627',
      'title': 'Other blog',
      'author': 'Someone',
      'url': 'localhost:3001',
      'likes': 1,
      '__v': 0
    },
    {
      '_id': '654bc4b06e745b689f0bf5e0',
      'title': 'Third blog',
      'author': 'Someone third',
      'url': 'localhost:3001',
      'likes': 0,
      '__v': 0
    },
    {
      '_id': '654bca7163991bffcf48c742',
      'title': 'Fourth blog',
      'author': 'Someone else',
      'url': 'localhost:3001',
      'likes': 0,
      '__v': 0
    },
    {
      '_id': '654d172546f0f8fbaa8982bb',
      'title': 'Sixth blog',
      'author': 'Someone else',
      'url': 'localhost:3001',
      'likes': 7,
      '__v': 0
    }
  ]

  test('several blogs with 0 to 7 likes', () => {
    const result = listHelper.totalLikes(someBlogs)
    expect(result).toBe(8)
  })

  test('several blogs with 0 likes', () => {
    const result = listHelper.totalLikes(someBlogs.filter(blog => blog.likes === 0))
    expect(result).toBe(0)
  })

  test('just one blog with 1 like', () => {
    const result = listHelper.totalLikes(someBlogs[2])
    expect(result).toBe(1)
  })
})