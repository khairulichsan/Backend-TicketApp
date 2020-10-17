const { Router } = require('express')
const {
  getAccountByID,
  getAccount,
  // updateAccount,
  patchAccount,
  deleteAccount,
  registerAccount,
  loginAccount
} = require('../controllers/account')

const { authorization } = require('../middleware/auth')

const router = Router()

router.post('/register', registerAccount)
router.post('/login', loginAccount)

router.get('/:id', getAccountByID)
router.get('/', getAccount)
// router.put('/:id', authorization, updateAccount)
router.patch('/', authorization, patchAccount)
router.delete('/', authorization, deleteAccount)

module.exports = router
