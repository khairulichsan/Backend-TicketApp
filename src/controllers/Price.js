const {
  checkpriceModel, postPaymentModel, postOrderModel
} = require('../Model/Price')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv')

module.exports = {

  orderUser: async (request, response) => {
    try {
      const { id_account, order_name, total_price, status_payment, id_plane, passangger, order_class, city_destination, city_depature, times_flight } = request.body

      const checkDataPrice = await checkpriceModel([id_plane, order_class, passangger, city_destination, city_depature, times_flight])
      console.log(checkDataPrice)

      const setData = {
        id_account,
        total_price,
        status_payment,
        created_at: new Date(),
        update_at: new Date()
      }

      const postPayment = await postPaymentModel(setData)
      console.log(postPayment)
      
      const setData2 = {
        id_account,
        id_price: checkDataPrice[0].id_price,
        order_name,
        created_at: new Date(),
        update_at: new Date()

      }

      const postOrder = await postOrderModel(setData2)
      console.log(postOrder)

      response.send({
        success: true,
        message: 'Succes Register User!',
        data:postOrder
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
        passangger = 'adult'

        const checkDataPrice = await checkpriceModel([order_class, passangger, city_destination, city_depature, times_flight])
        console.log(checkDataPrice.length)
        const price1 = (checkDataPrice[0].price) * nadult
        // console.log(price1)

        passangger = 'child'

        const checkDataPrice2 = await checkpriceModel([order_class, passangger, city_destination, city_depature, times_flight])
        console.log(checkDataPrice2[0].price)
        const price2 = (checkDataPrice2[0].price) * nchild
        // console.log(price2)

        var list = []
        for (i = 0; i < checkDataPrice.length; i++) {
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

        console.log(list)

        response.send({
          success: true,
          message: 'Succes Register User!',
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
  }

}
