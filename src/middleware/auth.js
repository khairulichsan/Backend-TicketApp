require('dotenv')
const jwt = require('jsonwebtoken')

module.exports = {
  authorization: (request, response, next) => {
    let token = request.headers.authorization
    if (token) {
      token = token.split(' ')[1]
      jwt.verify(token, process.env.JWT_KEY, (error, result) => {
        if ((error && error.name === 'JsonWebTokenError') || (error && error.name === 'TokenExpiredError')) {
          response.status(403).send({
            success: false,
            message: error.message
          })
        } else {
          if (result.status === 'activated') {
            next()
          } else {
            response.status(201).send({
              success: false,
              message: 'your account is not yet active'
            })
          }
        }
      })
    } else {
      response.status(400).send({
        success: false,
        message: 'Please login first!/ input authorization'
      })
    }
  }
}
