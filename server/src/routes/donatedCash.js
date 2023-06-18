const express = require('express');
const donatedCashController = require('../controller/donatedCash');
const router = express.Router();


router.post('/easyPaisaCashRecord', donatedCashController.easyPaisaCashRecord);
router.post('/jazzCashRecord', donatedCashController.jazzCashRecord);
router.get('/GetCashRec', donatedCashController.gettingCashRecord);
router.delete('/deletecashdonorRecord', donatedCashController.deletecashRecord);






module.exports = router;