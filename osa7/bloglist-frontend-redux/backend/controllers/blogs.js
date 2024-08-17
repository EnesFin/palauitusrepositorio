const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

blogRouter.post('/', middleware.userExtractor, async (request, response, next) => {
  const body = request.body
  if (body.likes === undefined) {
    body.likes = 0
  }

  const user = request.user

  const blog = await new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id,
  }).populate('user', { username: 1, name: 1 })
  //express-async-errors dosent seem to work
  try {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  } catch (exception) {
    next(exception)
  }
})

blogRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {
  const user = request.user
  const blogToDelete = await Blog.findById(request.params.id)

  if (user._id.toString() === blogToDelete.user._id.toString()) {
    try {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } catch (exception) {
      next(exception)
    }
  } else {
    return response.status(401).json({ error: 'Unauthorized' })
  }
})

blogRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  if (body.likes === undefined) {
    body.likes = 0
  }

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
    }).populate('user', { username: 1, name: 1 })
    response.json(updatedBlog)
  } catch (exception) {
    next(exception)
  }
})

blogRouter.post('/:id/comments', async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate('user', { username: 1, name: 1 })
  if (!blog) {
    return res.status(404).json({ error: 'resource does not exist' })
  }

  const comment = req.body?.comment
  if (!comment || comment.length === 0) {
    return res.status(400).json({ error: "comment can't be empty" })
  }

  blog.comments = blog.comments ? blog.comments.concat(comment) : [comment]

  const updatedBlog = await blog.save()

  res.json(updatedBlog)
})

blogRouter.get('/:id/comments', async (request, response) => {
  const { id } = request.params
  const comments = await Blog.findById(id).populate('comments')
  response.json(comments)
})

module.exports = blogRouter
