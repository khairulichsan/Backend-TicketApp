/* eslint-disable camelcase */

const db = require('../helper/database')
module.exports = {

  postPaymentModel: (setData) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO payment SET ?', setData, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },

  checkPriceModel: (arr) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM price WHERE id_plane='${arr[0]}' AND order_class='${arr[1]}' AND passangger='${arr[2]}' AND city_destination='${arr[3]}' AND city_depature='${arr[4]}' AND times_flight= '${arr[5]}'`, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  postOrderModel: (setData) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO order SET ?', setData, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  detailOrderModel: (id_order) => {
    return new Promise((resolve, reject) => {
      console.log(id_order)
      db.query('SELECT * FROM `order` AS O INNER JOIN price AS P ON O.id_price = P.id_price WHERE O.id_order = ?', id_order, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  }
}
