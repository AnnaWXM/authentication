const express = require('express')
const app = express()
app.use(express.static('dist'))
var morgan = require('morgan')

var cors = require('cors')
app.use(cors())
app.use(express.json())

const Blog = require('./models/blog')

const mongoose = require('mongoose')

const password = process.argv[2]

// connect to the database
const connectionStr = `mongodb+srv://anna:${password}@fullstack.9qs6gkk.mongodb.net/?retryWrites=true&w=majority&appName=FullStack`
const url = connectionStr
console.log('connecting to', url)
mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })
/* eslint-disable-next-line */
morgan.token('req-body', (req, res) => {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'))

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/blogs', async (request, response) => {
  try {
    const blogs = await Blog.find({})
    await blogs
    response.json(blogs)
  } catch (error) {
    /* eslint-disable-next-line */
    next(error)
  }
})

app.delete('/api/blogs/:id', async (request, response) => {
  const id = request.params.id
  try {
    await Blog.deleteOne({ _id: id })
    const Blogs = await Blog.find({})
    response.status(204).json(blogs)
  } catch (error) {
    /* eslint-disable-next-line */
    next(error)
  }
})

app.post('/api/blogs', async(request, response) => {
  mongoose.connect(connectionStr, {})
  const body = request.body
  console.log(request.body)
  if (!body.title || !body.author || !body.url) {
    return response.status(400).json({
      error: 'information missing'
    })
  }
  const blog = new Blog({
    _id: body._id,
    title: body.title,
    author: body.author,
    url:body.url,
    likes:0
  })
  blog.save().then(result => {
      response.json(result)
    })
})

app.use((err, req, res, next) => {
  console.error('Error: ', err)
  res.status(500).json({ error: 'Internal server error' })
})

const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})