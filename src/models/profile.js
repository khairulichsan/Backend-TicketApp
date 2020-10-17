/* eslint-disable camelcase */

const db = require('../helper/database')
module.exports = {
  getProfileDataModel: (searchKey, searchValue, limit, offset, callBack) => {
    db.query(`SELECT A.id_account, A.full_name, A.email, A.phone_number, P.profile_image, P.city, P.address FROM profile AS P INNER JOIN account AS A ON P.id_account = A.id_account WHERE ${searchKey} LIKE '%${searchValue}%' LIMIT ${limit} OFFSET ${offset}`, (err, result, fields) => {
      !err ? callBack(result) : callBack(err)
    })
  },
  getProfileDataByIdModel: (id, callBack) => {
    db.query(`SELECT A.id_account, A.full_name, A.email, A.phone_number, P.profile_image, P.city, P.address FROM profile AS P INNER JOIN account AS A ON P.id_account = A.id_account WHERE A.id_account = '${id}'`, (err, result, field) => {
      !err ? callBack(result) : callBack(err)
    })
  },
  putProfileDataModel: (id_account, data, profile_image, callBack) => {
    db.query(`UPDATE profile, account SET
        profile_image = '${profile_image}',
        city = '${data[0]}',
        address = '${data[1]}',
        full_name = '${data[2]}',
        email = '${data[3]}',
        password = '${data[4]}',
        phone_number = '${data[5]}'
        WHERE profile.id_account = ${id_account} AND account.id_account = ${id_account}`,
    (err, result, fields) => {
      !err ? callBack(result) : callBack(err)
    })
  }
}
