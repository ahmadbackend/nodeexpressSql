//encryption failed to use  
const bcrypt=require('bcryptjs');
const path = require('path');
const express = require('express');
const authController=require('../controllers/auth');
const router = express.Router();
// to log in and match useremail&&password with recorded data
router.get('/login',authController.getLogIn);
router.post('/login',authController.postLogIn);
        
    

//register new user and check if his really new or has pervious account
router.get('/register',authController.getRigster);
router.post('/registeration',authController.postReg);
      
             
    /**clearing the session */
router.post('/logout',authController.postLogOut);
   
module.exports = router;
        