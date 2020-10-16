const { Router } = require('express')
const uploadImage = require('../middleware/multer')
const {
    getPlanesData,
    getPlaneDataById,
    createPlaneData,
    putPlaneData,
    deletePlaneData
} = require('../controllers/planes')

const router = Router()

router.get('/', getPlanesData)
router.get('/:id', getPlaneDataById)
router.post('/', uploadImage, createPlaneData)
router.put('/:id',uploadImage, putPlaneData)
router.delete('/:id', deletePlaneData)
module.exports = router