const express = require('express');
const router=express.Router()



const UserControllers=require('../constrollers/user')

router.post('/signup',UserControllers.user_signup_user)

router.post('/login',UserControllers.user_login_user)





 router.delete('/:userId',UserControllers.user_delete_user)

module.exports =router