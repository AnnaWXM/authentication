const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', (request, response) => {
  Blog.find({}).then(blogs => {
  response.json(blogs)
})
})

usersRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
  .then(blog => {
    if (blog) {
      response.json(blog)
    } else {
      response.status(404).end()
    }
  })
  .catch(error => next(error))
})

usersRouter.delete('/:id', (request, response, next) => {
  Blog.findByIdAndDelete(request.params.id)
  .then(() => {
    response.status(204).end()
  })
  .catch(error => next(error))
})

usersRouter.put('/:id', (request, response, next) => {
const body = request.body

const blog = {
  content: body.content,
}

Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  .then(updatedBlog => {
    response.json(updatedBlog)
  })
  .catch(error => next(error))
})

usersRouter.patch('/:id', async (req, res) => {
const { id } = req.params;
const { likes } = req.body;

try {
  const blog = await Blog.findById(id);

  if (!blog) {
    return res.status(404).json({ error: 'Blog post not found' });
  }
  blog.likes = likes;
  const updatedBlog = await blog.save();
  res.status(200).json(updatedBlog);
} catch (error) {
  res.status(500).json({ error: 'Internal server error' });
}
});

module.exports = usersRouter





