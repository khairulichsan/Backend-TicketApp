const { Router } = require('express')
const { 
    getDataRegisterByID, getDataRegister, updateRegister, patchRegister, deleteRegister, 
    registerUser
    ,loginUser 
} = require('../Controler/Register')

const router = Router()


router.post('/register', registerUser)
router.post('/login', loginUser)


router.get('/:id', getDataRegisterByID)
router.get('/', getDataRegister)
router.put('/:id', updateRegister)
router.patch('/:id', patchRegister)
router.delete('/:id', deleteRegister)

module.exports = router
