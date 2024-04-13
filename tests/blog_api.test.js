const { test, describe, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { create } = require('../models/blog')
const api = supertest(app)

describe('Blogs api test', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  });

  test('blogs are indentify by id not _id', async () => {
    const response = await api.get('/api/blogs').expect(200);

    response.body.forEach(blog => {
      assert(blog.hasOwnProperty('id'), 'Blog post does not have "id" property');

      // Check if each blog post does not have "_id" property
      assert(!blog.hasOwnProperty('_id'), 'Blog post should not have "_id" property');
    });
  })

  test('blogs create successfully', async () => {
    const response = await api.get('/api/blogs')
    const blogCount = response.body.length

    const newBlog = {
      _id: '222',
      title: 'a new blog',
      author: 'author',
      url: 'https://new_bolg_url/test',
      likes: 0
    }

    const createResponse = await api.post('/api/blogs').send(newBlog)

    assert.strictEqual(createResponse.status, 201)


    const updatedResponse = await api.get('/api/blogs')
    const updatedBlogCount = updatedResponse.body.length
    assert.strictEqual(updatedBlogCount, blogCount +1 );
  });

  test('missing like property will fail', async () => {
    const response = await api.get('/api/blogs')
    const blogCount = response.body.length

    const newBlog = {
      _id: '222',
      title: 'a new blog',
      author: 'author',
      url: 'https://new_bolg_url/test'
    }

    const createResponse = await api.post('/api/blogs').send(newBlog)

    assert.notEqual(createResponse.status, 201)
  });

  test('missing title/url property will return 400', async () => {
    const response = await api.get('/api/blogs')
    const blogCount = response.body.length

    const newBlog = {
      _id: '3333',
      author: 'author',
      likes: 0
    }

    const createResponse = await api.post('/api/blogs').send(newBlog)

    assert.strictEqual(createResponse.status, 400)
  });


  test('update blog likes', async () => {
    const updatedBlogResponse = await api.patch('/api/blogs/222').send({likes:20})
    assert.strictEqual(updatedBlogResponse.status, 200)
    const updatedResponse = await api.get('/api/blogs/222')
    const likes = updatedResponse.body.likes

    assert.strictEqual(likes, 20)
  })


  test('deletes blog', async () => {
    const response = await api.get('/api/blogs')
    const initialCount = response.body.length

    const deleteResponse = await api.delete('/api/blogs/222')
    assert.strictEqual(deleteResponse.status, 204)
    const updatedResponse = await api.get('/api/blogs')
    const newLength = updatedResponse.body.length

    assert.strictEqual(newLength, initialCount -1)
  })



after(async () => {
  await mongoose.connection.close()
})

})

