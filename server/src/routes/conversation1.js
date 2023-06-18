const express =  require('express');
const converastion1Controller = require('../controller/conversation1');

const router = express.Router();

router.post("/new-conversation", converastion1Controller.NewCovnversation)

router.post("/get-conversation", converastion1Controller.getConversation);










module.exports = router