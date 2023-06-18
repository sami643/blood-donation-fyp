const express =  require('express');
const feedbackscontroller = require('../controller/feedbacks');

const router = express.Router();

router.post('/Feedback_post', feedbackscontroller.PostFeedbacks); 
router.get('/feedbacks', feedbackscontroller.feedbacks);

module.exports = router; 