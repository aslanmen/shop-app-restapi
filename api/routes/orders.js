const express = require('express');
const router=express.Router()
const check_auth=require('../middleware/check-auth')
const OrderController = require('../constrollers/order')



router.get('/',check_auth,OrderController.order_get_all)
router.post('/',check_auth,OrderController.order_create_order);


router.get('/:orderId',check_auth,OrderController.order_get_order)

router.delete('/:orderId',check_auth,OrderController.order_delete_order)
module.exports =router