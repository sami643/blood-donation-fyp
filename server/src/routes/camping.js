const express =  require('express');
const campcontroller = require('../controller/camping');

const router = express.Router();
router.post('/newCamp', campcontroller.newCamp); 
router.get('/existingCamps', campcontroller.existingCamps);  
router.post('/existingCamps-org', campcontroller.existingCampsOrg);
router.delete('/deleteCamp', campcontroller.deletCamp); 
 router.post('/updatecamp', campcontroller.updateCamp); 
router.post('/get-camp', campcontroller.getSpecificCamp);
router.put('/update-camp-by-org', campcontroller.updateCampByOrg);


module.exports = router;