const { Router } = require('express')
const {
  orderUser,
  getDataPrice,
  detailOrder
} = require('../controllers/price')

const router = Router()

router.get('/plane', getDataPrice)
router.post('/order', orderUser)
router.get('/detail/:id', detailOrder)

module.exports = router
