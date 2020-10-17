/* eslint-disable camelcase */

const {
  getProfileDataModel,
  getProfileDataByIdModel,
  putProfileDataModel
} = require('../models/profile')

const jwt = require('jsonwebtoken')

module.exports = {
  getProfileData: (req, res) => {
    let { search, page, limit } = req.query
    let searchKey = ''
    let searchValue = ''
    if (typeof search === 'object') {
      searchKey = Object.keys(search)[0]
      searchValue = Object.values(search)[0]
    } else {
      searchKey = 'full_name'
      searchValue = search || ''
    }
    !limit ? limit = 20 : limit = parseInt(limit)
    !page ? page = 1 : page = parseInt(page)
    const offset = (page - 1) * limit
    getProfileDataModel(searchKey, searchValue, limit, offset, result => {
      if (result.length) {
        res.status(200).send({
          success: true,
          message: 'list profile',
          data: result
        })
      } else {
        res.status(404).send({
          success: false,
          message: 'there is no item on list'
        })
      }
    })
  },
  getProfileDataById: (req, res) => {
    const { id } = req.params
    getProfileDataByIdModel(id, result => {
      if (result.length) {
        res.status(200).send({
          success: true,
          message: `Data profile with id = ${id}`,
          data: result[0]
        })
      } else {
        res.status(404).send({
          success: false,
          message: `Data profile with id = ${id} was not found!`
        })
      }
    })
  },
  putProfileData: (req, res) => {
    const {
      city,
      address,
      full_name,
      email,
      password,
      phone_number
    } = req.body
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
    const image = typeof req.file === 'undefined' ? '' : req.file.filename

    if (city && address && full_name && email && password && phone_number) {
      getProfileDataByIdModel(id_account, result => {
        if (result.length) {
          putProfileDataModel(id_account, [city, address, full_name, email, password, phone_number], image,
            result => {
              if (result.affectedRows) {
                res.status(200).send({
                  success: true,
                  message: `profile with id account ${id_account} has been updated`
                })
              } else {
                res.status(400).send({
                  success: false,
                  message: 'failed to update data'
                })
              }
            })
        } else {
          res.status(404).send({
            success: false,
            message: `profile with id account ${id_account} is not found!`
          })
        }
      })
    } else {
      res.status(400).send({
        success: false,
        message: 'all field must be filled!'
      })
    }
  }
}
