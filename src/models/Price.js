const db = require('../helper/database')
module.exports = {

  postPaymentModel: (setData) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO payment SET ?', setData, (error, result) => {
        if (!error) {
          const newResult = {
            id: result.insertId,
            ...setData
          }
          delete newResult.password
          resolve(newResult)
        } else {
          reject(new Error(error))
        }
      })
    })
  },

  checkpriceModel: (arr) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM table_price WHERE id_plane='${arr[0]}' AND order_class='${arr[1]}' AND passangger='${arr[2]}' AND city_destination='${arr[3]}' AND city_depature='${arr[4]}' AND times_flight= '${arr[5]}'`, (error, result) => {
        // SELECT * FROM table_price WHERE id_plane=1 AND class="economy" AND passangger="adult" AND city_destination="jakarta" AND city_depature="surabaya" AND times_flight="pagi"
        // console.log(result)
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
      db.query('INSERT INTO table_order SET ?', setData, (error, result) => {
        if (!error) {
          const newResult = {
            id: result.insertId,
            ...setData
          }
          delete newResult.password
          resolve(newResult)
        } else {
          reject(new Error(error))
        }
      })
    })
  }
}
