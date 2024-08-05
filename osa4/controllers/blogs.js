//Enes KOC
const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const middleware = require('../utils/middleware');

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });

  response.json(blogs);
});

blogRouter.post('/', middleware.userExtractor, async (request, response, next) => {
  const body = request.body;
  if (body.likes === undefined) {
    body.likes = 0;
  }

  const user = request.user;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  try {
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).json(savedBlog);
  } catch (exception) {
    next(exception);
  }
});

blogRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {
  const user = request.user;
  const blogToDelete = await Blog.findById(request.params.id);

  if (user._id.toString() === blogToDelete.user._id.toString()) {
    try {
      await Blog.findByIdAndRemove(request.params.id);
      response.status(204).end();
    } catch (exception) {
      next(exception);
    }
  } else {
    return response.status(401).json({ error: 'Unauthorized' });
  }
});

blogRouter.put('/:id', async (request, response, next) => {
  const body = request.body;

  if (body.likes === undefined) {
    body.likes = 0;
  }

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
    response.json(updatedBlog);
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogRouter;
