//Enes KOC
const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.get('/', async (request , response) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 })

  response.json(users)
})

userRouter.post('/', async (request, response , next) => {
  const { username, name, password } = request.body
  
  if (password.length < 3) {
    response.status(400).json({ error: 'User creation failed: password is shorter than 3' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  
  const user = new User({
    username: username,
    password: passwordHash,
    name:  name,
  })

  try {
    await user.save()
    response.status(201).end()   
  } catch(exception) {
    next(exception)
  }
})

module.exports = userRouter
