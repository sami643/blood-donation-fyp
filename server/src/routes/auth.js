const express =  require('express');
const authcontroller = require('../controller/auth');

const router = express.Router();
router.post('/signup', authcontroller.signup);

router.post('/signin', authcontroller.SignIn);
router.post('/userUpdate', authcontroller.userUpdate);
router.post('/verify', authcontroller.verifyOTP);
router.post('/resendOTP', authcontroller.resendOTP);
router.post('/forgotpassword', authcontroller.forgotPassword);
router.post('/passwordchange', authcontroller.passwordChange);
router.post('/userUpdate1', authcontroller.userUpdate1);
// Admin portion
router.get('/getadminlist', authcontroller.getadminlist);
router.delete('/removeAdmin', authcontroller.removeAdmin);
// router.get('/listedData', authcontroller.gettingData);


module.exports = router;