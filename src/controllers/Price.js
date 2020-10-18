/* eslint-disable camelcase */

const {
  checkPriceModel,
  postPaymentModel,
  postOrderModel,
  detailOrderModel
} = require('../models/price')

// const jwt = require('jsonwebtoken')
require('dotenv')

module.exports = {
  orderUser: async (request, response) => {
    try {
      const { id_account, order_name, total_price, id_plane, passengger, order_class, city_destination, city_depature, times_flight } = request.body

      const checkDataPrice = await checkPriceModel([id_plane, order_class, passengger, city_destination, city_depature, times_flight])

      const setData = {
        id_account,
        total_price,
        created_at: new Date(),
        update_at: new Date()
      }

      await postPaymentModel(setData)

      const setData2 = {
        id_account,
        id_price: checkDataPrice[0].id_price,
        order_name,
        created_at: new Date(),
        update_at: new Date()
      }

      const postOrder = await postOrderModel(setData2)

      response.send({
        success: true,
        message: 'Succes order!',
        data: postOrder
      })
    } catch (error) {
      console.log(error)
      response.status(400).send({
        success: false,
        message: 'Bad Request'
      })
    }
  },

  getDataPrice: async (request, response) => {
    try {
      const { order_class, nadult, nchild, city_destination, city_depature, times_flight } = request.body
      if (nadult >= 0 && nchild >= 0) {
        let passengger = 'adult'

        const checkDataPrice = await checkPriceModel([order_class, passengger, city_destination, city_depature, times_flight])
        console.log(checkDataPrice.length)
        const price1 = (checkDataPrice[0].price) * nadult

        passengger = 'child'

        const checkDataPrice2 = await checkPriceModel([order_class, passengger, city_destination, city_depature, times_flight])
        console.log(checkDataPrice2[0].price)
        const price2 = (checkDataPrice2[0].price) * nchild

        var list = []
        for (let i = 0; i < checkDataPrice.length; i++) {
          const setDataArray = {
            totalharga: (checkDataPrice[i].price * nadult) + (checkDataPrice2[i].price * nchild),
            plane: checkDataPrice[i].id_plane,
            city_destination: checkDataPrice[i].city_destination,
            city_depature: checkDataPrice[i].city_depature,
            times_flight: checkDataPrice[i].times_flight,
            order_class: checkDataPrice[i].order_class

          }

          list[i] = setDataArray
        }

        response.send({
          success: true,
          message: 'Succes!',
          data: list
        })
      } else {
        response.status(400).send({
          success: false,
          message: 'All field must fill'
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

  detailOrder: async (request, response) => {
    try {
      const id_order = request.params.id
      const result = await detailOrderModel(id_order)
      delete result[0].created_at
      delete result[0].update_at
      delete result[0].id_plane
      delete result[0].id_price
      response.send({
        success: true,
        message: 'Detail order!',
        data: result[0]
      })
    } catch (error) {
      response.status(400).send({
        success: false,
        message: 'Bad Request'
      })
    }
  }
}
