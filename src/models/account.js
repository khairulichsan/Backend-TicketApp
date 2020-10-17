const db = require('../helper/database')
module.exports = {
  postUserModel: (setData) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO account SET ?', setData, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },

  checkEmailModel: (email) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM account WHERE email = ?', email, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },

  getAccountByIDModel: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM account WHERE id_account=${id}`, (err, result, field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  getAccountModel: (searchKey, searchValue, limit, offset) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT id_account, full_name, email, phone_number, status FROM account WHERE ${searchKey} LIKE '%${searchValue}%' LIMIT ${limit} OFFSET ${offset}`, (err, result, field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  updateAccountModel: (arr, id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM account WHERE id_account = ${id}`, (_err, result, _field) => {
        if (result.length) {
          db.query(`UPDATE account SET name='${arr[0]}',email='${arr[1]}', password='${arr[2]}', number_phone='${arr[3]}', status='${arr[4]}'
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

  patchAccountModel: (data, id) => {
    return new Promise((resolve, reject) => {
      var query = `UPDATE account SET ${data} WHERE id_account = ${id}`
      db.query(query, (_err, result, _field) => {
        if (!_err) {
          resolve(result)
        } else {
          reject(new Error(_err))
        }
      })
    })
  },

  deleteAccountModel: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM account WHERE id_account=${id}`, (err, result, field) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}
