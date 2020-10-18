const { Router } = require('express')
const { 
    orderUser,
    getDataPrice
} = require('../Controler/Price')

const router = Router()


router.get('/plane', getDataPrice)
router.post('/order', orderUser)


module.exports = router
