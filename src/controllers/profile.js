/* eslint-disable camelcase */

const profile = require('../models/profile')
const {
  getProfileDataModel,
  getProfileDataByIdModel,
  createProfileDataModel,
  putProfileDataModel,
  deleteProfileDataModel
} = require('../models/profile')

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
  createProfileData: (req, res) => {
    const { id_account } = req.body
    if (id_account) {
      createProfileDataModel(id_account, result => {
        res.status(200).send({
          success: true,
          message: 'profile has been created'
        })
      })
    } else {
      res.status(400).send({
        success: false,
        message: 'the field id account must be filled!'
      })
    }
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
    const id = req.params.id
    const image = typeof req.file === 'undefined' ? '' : req.file.filename
    if (city && address && full_name && email && password && phone_number) {
      getProfileDataByIdModel(id, result => {
        if (result.length) {
          putProfileDataModel(id, [city, address, full_name, email, password, phone_number], image,
            result => {
              if (result.affectedRows) {
                res.status(200).send({
                  success: true,
                  message: `profile with id account ${id} has been updated`
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
            message: `profile with id account ${id} is not found!`
          })
        }
      })
    } else {
      res.status(400).send({
        success: false,
        message: 'all field must be filled!'
      })
    }
  },
  deleteProfileData: (req, res) => {
    const { id } = req.params
    getProfileDataByIdModel(id, result => {
      if (result.length) {
        deleteProfileDataModel(id, result => {
          if (result.affectedRows) {
            res.status(200).send({
              success: true,
              message: `Item profile with id = ${id} has been deleted`
            })
          } else {
            res.status(400).send({
              success: false,
              message: 'Failed to delete'
            })
          }
        })
      } else {
        res.status(404).send({
          success: false,
          message: 'Data profile was not found!'
        })
      }
    })
  }
}
