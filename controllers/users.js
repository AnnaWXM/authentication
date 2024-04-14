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
  User.find({}).then(users => {
  response.json(users)
})
})

usersRouter.get('/:id', (request, response, next) => {
  User.findById(request.params.id)
  .then(user => {
    if (user) {
      response.json(user)
    } else {
      response.status(404).end()
    }
  })
  .catch(error => next(error))
})

usersRouter.delete('/:id', (request, response, next) => {
  User.findByIdAndDelete(request.params.id)
  .then(() => {
    response.status(204).end()
  })
  .catch(error => next(error))
})

usersRouter.put('/:id', (request, response, next) => {
const body = request.body

const user = {
  content: body.content,
}

User.findByIdAndUpdate(request.params.id, user, { new: true })
  .then(updatedUser => {
    response.json(updatedUser)
  })
  .catch(error => next(error))
})

usersRouter.patch('/:id', async (req, res) => {
const { id } = req.params;
const { likes } = req.body;

try {
  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ error: 'User post not found' });
  }
  user.likes = likes;
  const updatedUser = await user.save();
  res.status(200).json(updatedUser);
} catch (error) {
  res.status(500).json({ error: 'Internal server error' });
}
});

module.exports = usersRouter





