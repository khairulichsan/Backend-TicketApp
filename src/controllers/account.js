/* eslint-disable camelcase */

const {
  getAccountByIDModel,
  getAccountModel,
  // updateAccountModel,
  patchAccountModel,
  deleteAccountModel,
  postUserModel,
  checkEmailModel
} = require('../models/account')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv')

module.exports = {
  registerAccount: async (request, response) => {
    const { full_name, email, password, phone_number, status } = request.body
    const salt = bcrypt.genSaltSync(12)
    const encryptPassword = bcrypt.hashSync(password, salt)

    const setData = {
      full_name,
      email,
      password: encryptPassword,
      phone_number,
      status,
      created_at: new Date()
    }

    try {
      const checkEmail = await checkEmailModel(email)
      if (!checkEmail.length) {
        await postUserModel(setData)
        delete setData.password
        delete setData.created_at
        response.send({
          success: true,
          message: 'Succes Register Account!',
          data: setData
        })
      } else {
        response.send({
          success: false,
          message: 'Email has been registered!'
        })
      }
    } catch (error) {
      console.log(error)
      response.status(400).send({
        success: false,
        message: 'Bad Request'
      })
    }
  },

  loginAccount: async (request, response) => {
    try {
      const { email, password } = request.body
      const checkAccount = await checkEmailModel(email)
      if (checkAccount.length) {
        const checkPassword = bcrypt.compareSync(password, checkAccount[0].password)
        if (checkPassword) {
          const { id_account, full_name, email, phone_number, status } = checkAccount[0]
          let payload = {
            id_account,
            full_name,
            email,
            phone_number,
            status
          }
          const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '10h' })
          payload = { ...payload, token }
          response.send({
            success: true,
            message: 'Succes Login!',
            data: payload
          })
        } else {
          response.status(201).send({
            success: false,
            message: 'Wrong Password!'
          })
        }
      } else {
        response.status(201).send({
          success: false,
          message: 'Email/Account not registered!'
        })
      }
    } catch (error) {
      console.log(error)
      response.status(400).send({
        success: false,
        message: 'Bad Request'
      })
    }
  },

  getAccountByID: async (req, res) => {
    const { id } = req.params
    try {
      const result = await getAccountByIDModel(id)
      delete result[0].password
      delete result[0].created_at
      delete result[0].updated_at
      res.send({
        success: true,
        message: `Data account id ${id}`,
        data: result[0]
      })
    } catch (error) {
      res.send({
        success: false,
        message: `Data account id ${id} not found`
      })
    }
  },

  getAccount: async (req, res) => {
    let { page, limit, search } = req.query
    let searchKey = ''
    let searchValue = ''
    if (typeof search === 'object') {
      searchKey = Object.keys(search)[0]
      searchValue = Object.values(search)[0]
    } else {
      searchKey = 'full_name'
      searchValue = search || ''
    }

    if (!limit) {
      limit = 10
    } else {
      limit = parseInt(limit)
    }

    if (!page) {
      page = 1
    } else {
      page = parseInt(page)
    }

    const offset = (page - 1) * limit

    try {
      const result = await getAccountModel(searchKey, searchValue, limit, offset)
      if (result.length) {
        res.send({
          success: true,
          message: 'List user',
          data: result
        })
      } else {
        res.send({
          success: false,
          message: 'There is no item list'
        })
      }
    } catch (error) {
      console.log(error)
      res.status(500).send({
        success: false,
        message: 'Bad Request'
      })
    }
  },

  patchAccount: async (req, res) => {
    let id_account = ''
    const token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, process.env.JWT_KEY, (error, result, response) => {
      if ((error && error.name === 'JsonWebTokenError') || (error && error.name === 'TokenExpiredError')) {
        response.status(403).send({
          success: false,
          message: error.message
        })
      } else {
        id_account = result.id_account
      }
    })

    try {
      const setData = {
        ...req.body
      }

      const data = Object.entries(setData).map(item => {
        return `${item[0]}='${item[1]}'`
      })

      const result = await patchAccountModel(data, id_account)
      if (result.affectedRows) {
        res.send({
          success: true,
          messages: `Account with id ${id_account} has been Updated`
        })
      } else {
        res.send({
          success: false,
          messages: 'Failed to Update'
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Bad Request'
      })
    }
  },

  deleteAccount: async (req, res) => {
    let id_account = ''
    const token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, process.env.JWT_KEY, (error, result, response) => {
      if ((error && error.name === 'JsonWebTokenError') || (error && error.name === 'TokenExpiredError')) {
        response.status(403).send({
          success: false,
          message: error.message
        })
      } else {
        id_account = result.id_account
      }
    })

    try {
      const result = await deleteAccountModel(id_account)
      if (result.affectedRows) {
        res.send({
          success: true,
          message: `Account id ${id_account} has been deleted`
        })
      } else {
        res.send({
          success: false,
          message: 'Failed to deleted!'
        })
      }
    } catch (error) {
      console.log(error)
      res.status(500).send({
        success: false,
        message: 'Bad Request'
      })
    }
  }
}

// updateRegister: async (req, res) => {
//   const id = req.params.id
//   const { name, email, password, number_phone, status } = req.body

//   try {
//     if (name.trim() && email.trim() && password.trim() && number_phone.trim() && status.trim()) {
//       const result = await updateRegisterModel([name, email, password, number_phone, status], id)
//       console.log(result)
//       if (result.affectedRows) {
//         res.send({
//           success: true,
//           messages: `Account with id ${id} Has Been Updated`
//         })
//       } else {
//         res.send({
//           success: false,
//           messages: 'Field must be filled'
//         })
//       }
//     } else {
//       res.send({
//         success: false,
//         messages: 'Error'
//       })
//     }
//   } catch (error) {
//     console.log(error)
//     res.status(500).send({
//       success: false,
//       message: 'Bad Request'
//     })
//   }
// },
