const express = require('express')
const app = express()
const bodyParser = require('body-parser')
require('dotenv').config()
const cors = require('cors')   

const planesRouter = require('./src/routes/planes')
const profileRouter = require('./src/routes/profile')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/planes', planesRouter)
app.use('/profile', profileRouter)

app.use('/assets', express.static('./assets'))

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization')
    next()
  })

app.get('/', (request, response) => {
    response.send({
        success: true,
        message: 'Server Back End Ankasa Ticketing'
    })
})

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization')
    next()
  })

app.listen(process.env.PORT, () => {
    console.log(`Listening to port ${process.env.PORT}`)
})