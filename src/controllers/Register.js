const {
  getDataRegisterByIDModel,
  getDataRegisterModel,
  updateRegisterModel, patchRegisterModel, deleteRegisterModel, postUserModel, checkUserModel
} = require('../Model/Register')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv')

module.exports = {

  registerUser: async (request, response) => {
    const { name, email, password, number_phone, status } = request.body
    const salt = bcrypt.genSaltSync(10)
    const encryptPassword = bcrypt.hashSync(password, salt)
    // Pengkondisian untuk mengecheck Email
    const setData = {
      name,
      email,
      password: encryptPassword,
      number_phone,
      status,
      created_at: new Date()
    }

    try {
      const result = await postUserModel(setData)
      console.log(result)
      response.send({
        success: true,
        message: 'Succes Register User!',
        data: result
      })
    } catch (error) {
      console.log(error)
      response.status(400).send({
        success: false,
        message: 'Bad Request'
      })
    }
  },

  loginUser: async (request, response) => {
    try {
      const { email, password } = request.body
      const checkDataUser = await checkUserModel(email)
      if (checkDataUser.length >= 1) {
        const checkPassword = bcrypt.compareSync(password, checkDataUser[0].password)
        if (checkPassword) {
          const { id_account, name, email, number_phone, status } = checkDataUser[0]
          let payload = {
            id_account,
            name,
            email,
            number_phone,
            status
          }
          const token = jwt.sign(payload, process.env.jwtkey, { expiresIn: '1h' })
          payload = { ...payload, token }
          response.send({
            success: true,
            message: 'Succes Login!',
            data: payload
          })
        } else {
          response.status(400).send({
            success: false,
            message: 'Wrong Password!'
          })
        }
      } else {
        response.status(400).send({
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

  getDataRegisterByID: async (req, res) => {
    const { id } = req.params
    try {
      const result = await getDataRegisterByIDModel(id)
      res.send({
        success: true,
        message: `Data register id${id}`,
        data: result[0]
      })
    } catch (error) {
      res.send({
        success: false,
        message: `Data register id${id} not found`
      })
    }
  },
  getDataRegister: async (req, res) => {
    let { page, limit, search } = req.query
    let searchKey = ''
    let searchValue = ''
    if (typeof search === 'object') {
      searchKey = Object.keys(search)[0]
      searchValue = Object.values(search)[0]
    } else {
      searchKey = 'name'
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
      const result = await getDataRegisterModel(searchKey, searchValue, limit, offset)
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

  updateRegister: async (req, res) => {
    const id = req.params.id
    const { name, email, password, number_phone, status } = req.body

    try {
      if (name.trim() && email.trim() && password.trim() && number_phone.trim() && status.trim()) {
        const result = await updateRegisterModel([name, email, password, number_phone, status], id)
        console.log(result)
        if (result.affectedRows) {
          res.send({
            success: true,
            messages: `Account with id ${id} Has Been Updated`
          })
        } else {
          res.send({
            success: false,
            messages: 'Field must be filled'
          })
        }
      } else {
        res.send({
          success: false,
          messages: 'Error'
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
  //   name, email, password, number_phone, status
  patchRegister: async (req, res) => {
    const id = req.params.id
    const { name = '', email = '', password = '', number_phone = '', status = '' } = req.body
    try {
      if (name.trim() || email.trim() || password.trim() || number_phone.trim() || status.trim()) {
        const result = await getDataRegisterByIDModel(id)
        const data = Object.entries(req.body).map(item => {
          console.log(item)
          return parseInt(item[1]) > 0 ? `${item[0]}=${item[1]}` : `${item[0]}='${item[1]}'`
        })
        if (result.length) {
          const result2 = await patchRegisterModel(data, id)
          if (result2.affectedRows) {
            res.send({
              success: true,
              messages: `Account With id ${id} has been Updated`
            })
          } else {
            res.send({
              success: false,
              messages: 'Failed to Update'
            })
          }
        } else {
          res.send({
            success: false,
            messages: 'Data Project Not Found'
          })
        }
      } else {
        res.send({
          success: false,
          messages: 'Error'
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

  deleteRegister: async (req, res) => {
    const id = req.params.id
    try {
      const result = await getDataRegisterByIDModel(id)
      if (result.length) {
        const result2 = await deleteRegisterModel(id)
        if (result2.affectedRows) {
          res.send({
            success: true,
            message: `item Account id ${id} has been deleted`

          })
        } else {
          res.send({
            success: false,
            message: 'Failed to deleted!'

          })
        }
      } else {
        res.send({
          success: false,
          message: 'Data project not found!'

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
