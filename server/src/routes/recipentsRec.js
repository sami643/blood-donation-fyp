const express =  require('express');
const recipentRecController = require('../controller/recipentsRec');
const router = express.Router();

// Creating routes for recipent data.
router.post('/newRecipent', recipentRecController.newrecipentRec);
router.post('/get-recordfor-editing', recipentRecController.getrecipentsRecordsFOrEditing);
router.get('/getrecipentRec', recipentRecController.getrecipentRec); 
router.put( '/updaterecipentRec',recipentRecController.updaterecipentRec);
router.delete('/deletdonor-rec', recipentRecController.deleterecipentRec);
router.get('/activeRecipe', recipentRecController.activeRecipentRec);
router.get('/activeRecipes', recipentRecController.activeRecipentRecs);
router.put('/Justifybutton', recipentRecController.justification);
router.put('/donors-search-result',recipentRecController.donorSearchingForRecipents)
router.post('/get-active-status-from-db', recipentRecController.GettingActiveStatus);


router.get('/recipents-record', recipentRecController.getrecipentRecfordonorediting);

module.exports = router;