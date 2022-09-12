const { Router } = require('express')
const User = require('../Models/User.model')
var bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Login = Router()

Login.post('/', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(401).send({ message: 'please Enter valid Credentials' })
  }
  try {
    const exist = await User.find({ email })

    if (exist.length == 0) {
      return res
        .status(404)
        .send({ message: 'there is no registred user with this mail' })
    }

    var verify = await bcrypt.compareSync(password, exist[0].password)

    if (!verify) {
      res.status(401).send({ message: 'please enter Correct credentials' })
    }

    const token = jwt.sign(
      { email, name: exist[0].name, id: exist[0]._id },
      'secret',
      { expiresIn: '1h' },
    )

    res.status(200).send({ token })
  } catch (e) {
    res.status(400).send({ message: e.message })
  }
})

module.exports = Login
