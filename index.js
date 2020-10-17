const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const db = require('./helper/db')
require('dotenv').config()
const cors = require('cors')
const { request, response } = require('express')

app.use('/uploads', express.static('Uploads'))

const registerRouter = require('./routers/register')
const order = require('./Routers/Price')
// const companyRouter = require('./routers/company')
// const workerRouter = require('./routers/worker')
// const experienceRouter = require('./routers/experience')
// const portofolioRouter = require('./routers/portofolio')
// const projectRouter = require('./routers/project')
// const projectmanRouter = require('./routers/projectman')
// const skillRouter = require('./routers/skill')

app.use(bodyParser.urlencoded({ extended: false }))
app.use('/regis', registerRouter)
app.use('/order', order)
// app.use('/company', companyRouter)
// app.use('/worker', workerRouter)
// app.use('/experience', experienceRouter)
// app.use('/portofolio', portofolioRouter)
// app.use('/projectman', projectmanRouter)
// app.use('/project', projectRouter)
// app.use('/skill', skillRouter)

app.use(cors())

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*')
  response.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  next()
})

app.get('/', (request, response) => {
  response.send('Android 1 Backend')
})

app.listen(process.env.PORT, () => {
  console.log(`App Listen on Port ${process.env.PORT}!`)
})
