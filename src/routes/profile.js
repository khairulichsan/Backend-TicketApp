const { Router } = require('express')
const uploadImage = require('../middleware/multer')
const {
    getProfileData,
    getProfileDataById,
    createProfileData,
    putProfileData,
    deleteProfileData
} = require('../controllers/profile')

const router = Router()

router.get('/', getProfileData)
router.get('/:id', getProfileDataById)
router.post('/', createProfileData)
router.put('/:id',uploadImage, putProfileData)
router.delete('/:id', deleteProfileData)
module.exports = router