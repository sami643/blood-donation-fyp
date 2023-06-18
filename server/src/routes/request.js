const express =  require('express');
const requestController = require('../controller/request');
const router = express.Router();

// Camp req
router.post('/postingReq', requestController.ReqPosting);
router.get('/gettingRequests', requestController.getReq);
router.delete('/deletingReq', requestController.deletingReq);
router.get('/gettingcampReq', requestController.getcampReq);
router.get('/gettingOrgReq', requestController.getOrgReq);
router.get('/gettingAdminReq', requestController.getAdminReq);


// Admin, Org, and Camping Sign up request approval button.
router.post('/adminreqApproval', requestController.ReqApproval)
router.post('/orgreqApproval', requestController.OrgReqApproval);
router.post('/campreqApproval', requestController.CampReqApproval);


// Request section decline button
router.delete('/requestdeclineb', requestController.requestDeclineB);

// router.delete('/campdeclineb', requestController.campreqDeclineB);
// router.delete('/orgdeclineb', requestController.orgreqDeclineB);



// Admin req
router.get('/adminreq', requestController.adminSignUpReq)




module.exports = router;
