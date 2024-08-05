const bcrypt = require('bcrypt')
const User = require('../models/user')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)


describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({
      username: 'root',
      name: 'Superuser',
      password: passwordHash,
    })
    
    await user.save()
  })
  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()
    
    const newUser = {
      username: 'mtest',
      password: 'password',
      name: 'm tester',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
    
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
  test('salting works', async () => {
    const allUsers = await helper.usersInDb()
    const undefinedPassword = allUsers.find(user => user.password === 'password')
    expect(undefinedPassword).toBe(undefined)
  })
  test('creation fails with a too short password', async () => {
    const newUser = {
      username: 'mtest',
      password: 'as',
      name: 'm tester',
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })
  test('creation fails with missing field', async () => {
    const newUser = {
      username: '',
      password: 'foobar',
      name: 'm tester',
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })
  test('creation fails with too short username', async () => {
    const newUser = {
      username: 'ml',
      password: 'foobar',
      name: 'm tester',
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })
  test('creation fails with non unique username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})