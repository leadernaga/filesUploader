const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connection = require('./Database/db')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.listen(process.env.PORT || 8080, async () => {
  try {
    await connection
    console.log('data base is connected')
  } catch (e) {
    console.log('data base is disconnected')
  }

  console.log('server started')
})
