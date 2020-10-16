const db = require('../helper/database')
module.exports = {
    getPlanesDataModel: (searchKey, searchValue, limit, offset, callBack) => {
        db.query(`SELECT * FROM plane WHERE ${searchKey} LIKE '%${searchValue}%' 
        LIMIT ${limit} OFFSET ${offset}`, (err, result, fields) => {
        !err ? callBack(result) : callBack(err)
      })
    },
    getPlanesDataByIdModel: (id, callBack) => {
        db.query(`SELECT * FROM plane WHERE id_plane = '${id}'`, (err, result, field) => {
        !err ? callBack(result) : callBack(err)
        })
      },
    createPlaneDataModel: (plane_name, plane_image, callBack) => {
        db.query(`INSERT INTO plane (plane_name, plane_image) VALUES ('${plane_name}', '${plane_image}')`,
        (err, result, fields) => {
        !err ? callBack(result) : callBack(err)
        })
      },
      putPlaneDataModel: (id, plane_name, plane_image, callBack) => {
        db.query(`UPDATE plane SET
        plane_name = '${plane_name}',
        plane_image = '${plane_image}' WHERE id_plane = ${id}`, (err, result, fields) => {
          !err ? callBack(result) : callBack(err)
        })
      },
      deletePlaneDataModel: (id, callBack) => {
        db.query(`DELETE FROM plane WHERE id_plane = '${id}'`, (err, result, fields) => {
          !err ? callBack(result) : callBack(err)
        })
      }
}
