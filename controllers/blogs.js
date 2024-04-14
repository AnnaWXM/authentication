const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user').User

blogsRouter.get('/', (request, response) => {
    Blog.find({}).then(blogs => {
    response.json(blogs)
  })
})

blogsRouter.get('/:id', (request, response, next) => {
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

blogsRouter.post('/', async(request, response, next) => {
  const body = request.body
  const existingUser = await User.findOne({_id: body.userId})
  if (!body.title || !body.author || !body.url || !body._id) {
    return response.status(400).json({
      error: 'information missing'
    })
  }else {
try{
  const blog = new Blog({
    _id: body._id,
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: existingUser
  })

  blog.save()
    .then(savedBlog => {
      response.status(201).json(savedBlog)
    })
    .catch(error => next(error))
  }
  catch(err){
    console.error(err)
  }
}
})

blogsRouter.delete('/:id', (request, response, next) => {
    Blog.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

blogsRouter.put('/:id', (request, response, next) => {
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

blogsRouter.patch('/:id', async (req, res) => {
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

module.exports = blogsRouter