const express =  require('express');
const orgCotroller = require('../controller/organize');
const router = express.Router();

router.post('/orgsignUp', orgCotroller.OrgSingUp);
//router.post('/authenticate', orgCotroller.orgFind);

module.exports = router;