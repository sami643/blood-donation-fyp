const express =  require('express');
const message1Controller = require('../controller/message1');

const router = express.Router();



router.post('/post-message', message1Controller.postMessages);
router.post('/get-message', message1Controller.getMessages);




module.exports = router;