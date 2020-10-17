const db = require('../helper/database')
module.exports = {
    getProfileDataModel: (searchKey, searchValue, limit, offset, callBack) => {
        db.query(`SELECT * FROM profile INNER JOIN account
        ON profile.id_account = account.id_account WHERE ${searchKey} LIKE '%${searchValue}%' 
        LIMIT ${limit} OFFSET ${offset}`, (err, result, fields) => {
        !err ? callBack(result) : callBack(err)
      })
    },
    getProfileDataByIdModel: (id, callBack) => {
        db.query(`SELECT * FROM profile INNER JOIN account
        ON profile.id_account = account.id_account WHERE id_profile = '${id}'`, (err, result, field) => {
        !err ? callBack(result) : callBack(err)
        })
      },
    createProfileDataModel: (id_account, callBack) => {
        db.query(`INSERT INTO profile (id_account) VALUES ('${id_account}')`, (err, result, fields) => {
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
      },
      deleteProfileDataModel: (id, callBack) => {
        db.query(`DELETE FROM profile WHERE id_profile = '${id}'`, (err, result, fields) => {
          !err ? callBack(result) : callBack(err)
        })
      }
}
