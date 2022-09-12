const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connection = require('./Database/db')
const Signup = require('./Routes/Signup.Route')
const Login = require('./Routes/Login.Route')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use('/login', Login)
app.use('/signup', Signup)
app.get('/', (req, res) => {
  res.send('app is working')
})

app.listen(process.env.PORT || 8080, async () => {
  try {
    await connection
    console.log('data base is connected')
  } catch (e) {
    console.log('data base is disconnected')
  }

  console.log('server started')
})
