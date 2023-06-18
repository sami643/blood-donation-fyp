const express =  require('express');
const managmentController = require('../controller/management');
const router = express.Router();


router.put ('/updateBloodInfo', managmentController.updatebloodInfo);
router.post ('/updatejazzNo', managmentController.jazzCashNo);
router.put('/updateContactUs', managmentController.updateContctUs);
router.post('/updateEasyPaisa', managmentController.EasyPaisaUpdate)
router.put('/updateAboutUs', managmentController.updateAboutUs);
router.get('/gettingbloodInfo', managmentController.gettingBloodInfo);
router.get('/getAboutUs', managmentController.getAboutUs);
router.get('/jazzCashNo', managmentController.getJazzCashNo);
 router.get('/getEasyPaidNo', managmentController.getWEasyPNo);
router.get('/getContactUsNo', managmentController.getContactUsNo);
router.post('/ContactUs', managmentController.contactUs);


module.exports = router;