const db = require('../Helper/db')
module.exports = {

  postUserModel: (setData) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO table_account SET ?', setData, (error, result) => {
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

  checkUserModel: (email) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT id_account, name, email, password, number_phone, status FROM table_account WHERE email = ?', email, (error, result) => {
        console.log(error)
        if (!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },

  getDataRegisterByIDModel: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT*FROM table_account WHERE id_account=${id}`, (err, result, field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  getDataRegisterModel: (searchKey, searchValue, limit, offset) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM table_account WHERE ${searchKey} LIKE '%${searchValue}%' LIMIT ${limit} OFFSET ${offset}`, (err, result, field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  updateRegisterModel: (arr, id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM table_account WHERE id_account = ${id}`, (_err, result, _field) => {
        if (result.length) {
          db.query(`UPDATE table_account SET name='${arr[0]}',email='${arr[1]}', password='${arr[2]}', number_phone='${arr[3]}', status='${arr[4]}'
         WHERE id_account = ${id}`, (_err, result, _fields) => {
            if (!_err) {
              resolve(result)
            } else {
              reject(new Error(_err))
            }
          })
        }
      })
    })
  },

  patchRegisterModel: (data, id) => {
    return new Promise((resolve, reject) => {
      var query = `UPDATE table_account SET ${data} WHERE id_account = ${id}`
      db.query(query, (_err, result, _field) => {
        if (!_err) {
          resolve(result)
        } else {
          reject(new Error(_err))
        }
      })
    })
  },

  deleteRegisterModel: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM table_account WHERE id_account=${id}`, (err, result, field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}
