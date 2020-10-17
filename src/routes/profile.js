const { Router } = require('express')
const uploadImage = require('../middleware/multer')
const {
  getProfileData,
  getProfileDataById,
  putProfileData
} = require('../controllers/profile')

const router = Router()

router.get('/', getProfileData)
router.get('/:id', getProfileDataById)
router.put('/', uploadImage, putProfileData)

module.exports = router
