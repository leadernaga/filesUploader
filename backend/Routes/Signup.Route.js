const User = require('../Models/User.model')
const { Router } = require('express')
const bcrypt = require('bcryptjs')

const Signup = Router()

Signup.post('/', async (req, res) => {
  const { email, name, password } = req.body
  console.log(req.body)

  if (!email || !name || !password) {
    return res.status(401).send({ message: 'enter every field' })
  }

  try {
    const exist = await User.find({ email })

    if (exist.length > 0) {
      return res.status(409).send({ message: 'user already exist' })
    }

    var salt = bcrypt.genSaltSync(10)
    var hash = bcrypt.hashSync(password, salt)

    const response = await User.create({ name, email, password: hash })

    res.status(200).send({ message: 'signup successfull' })
  } catch (e) {
    res.status(401).send(e.message)
  }
})

module.exports = Signup
