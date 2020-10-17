/* eslint-disable camelcase */

const {
  getPlanesDataModel,
  createPlaneDataModel,
  putPlaneDataModel,
  getPlanesDataByIdModel,
  deletePlaneDataModel
} = require('../models/planes')

module.exports = {
  getPlanesData: (req, res) => {
    let { search, page, limit } = req.query
    let searchKey = ''
    let searchValue = ''
    if (typeof search === 'object') {
      searchKey = Object.keys(search)[0]
      searchValue = Object.values(search)[0]
    } else {
      searchKey = 'plane_name'
      searchValue = search || ''
    }
    !limit ? limit = 20 : limit = parseInt(limit)
    !page ? page = 1 : page = parseInt(page)
    const offset = (page - 1) * limit
    getPlanesDataModel(searchKey, searchValue, limit, offset, result => {
      if (result.length) {
        res.status(200).send({
          success: true,
          message: 'list planes',
          data: result
        })
      } else {
        console.log(result)
        res.status(404).send({
          success: false,
          message: 'there is no item on list'
        })
      }
    })
  },
  getPlaneDataById: (req, res) => {
    const { id } = req.params
    getPlanesDataByIdModel(id, result => {
      if (result.length) {
        res.status(200).send({
          success: true,
          message: `Data plane with id = ${id}`,
          data: result[0]
        })
      } else {
        res.status(404).send({
          success: false,
          message: `Data plane with id = ${id} was not found!`
        })
      }
    })
  },
  createPlaneData: (req, res) => {
    const { plane_name } = req.body
    const image = typeof req.file === 'undefined' ? '' : req.file.filename
    if (plane_name) {
      createPlaneDataModel(plane_name, image, result => {
        res.status(200).send({
          success: true,
          message: 'plane has been created'
        })
      })
    } else {
      res.status(400).send({
        success: false,
        message: 'the field plane name must be filled!'
      })
    }
  },
  putPlaneData: (req, res) => {
    const { plane_name } = req.body
    const id = req.params.id
    const image = typeof req.file === 'undefined' ? '' : req.file.filename
    if (plane_name) {
      getPlanesDataByIdModel(id, result => {
        if (result.length) {
          putPlaneDataModel(id, plane_name, image, result => {
            if (result.affectedRows) {
              res.status(200).send({
                success: true,
                message: `plane with id ${id} has been updated`
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
            message: `plane with id ${id} is not found!`
          })
        }
      })
    } else {
      res.status(400).send({
        success: false,
        message: 'plane name must be filled!'
      })
    }
  },
  deletePlaneData: (req, res) => {
    const { id } = req.params
    getPlanesDataByIdModel(id, result => {
      if (result.length) {
        deletePlaneDataModel(id, result => {
          if (result.affectedRows) {
            res.status(200).send({
              success: true,
              message: `Item plane with id = ${id} has been deleted`
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
          message: 'Data plane was not found!'
        })
      }
    })
  }
}
