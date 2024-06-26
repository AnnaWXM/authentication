const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')


describe('favorite blog', () => {

    const emptyBlog = []

    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      }
    ]

    const list = [
        {
          _id: '5a422aa71b54a676234d7f33',
          title: "Canonical string reduction",
          author: "Edsger W. Dijkstra",
          url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra92.pdf',
          likes: 12,
          __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Blog name',
            author: 'First Last Name',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 3,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 2,
            __v: 0
        }
      ]

    test('of empty list is error message', () => {
        const result = listHelper.favoriteBlog(emptyBlog)
        assert.strictEqual(result, "Error: the bloger list is empty")
    })

    test('when list has only one blog, return the blog', () => {
      const result = listHelper.favoriteBlog(listWithOneBlog)
      assert.deepStrictEqual(result, {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        likes: 5
      })
    })

    test('of a list return the biggest likes one', () => {
        const result = listHelper.favoriteBlog(list)
        assert.deepStrictEqual(result, {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
          })
    })
  })