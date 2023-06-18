const express =  require('express');
const { route } = require('express/lib/application');
const donorRecController = require('../controller/donorRec');


const router = express.Router();
router.post('/newDonor', donorRecController.newDonorRec); 
router.post('/updateDonorRec', donorRecController.updateDonorRec);
router.get('/getdonorRec', donorRecController.getDonorRec);
router.delete('/deletdonor-rec',donorRecController.deleteDonorRec);
router.put('/search-result-recipents', donorRecController.searchResultforRecipents);
router.put('/justifying', donorRecController.justification);
router.get('/activedonors', donorRecController.activeDonorsappearInSearchOption);
router.post('/getActiveStatus', donorRecController.GettingActiveStatus);
router.post("/get-record", donorRecController.getSpecificDonorRec);


module.exports = router


