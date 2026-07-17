const express = require("express");
const router = express.Router();
const policyController= require('../Controller/policyController')
router.post('/upload-policy',policyController.uploadPolicy )
router.get('/get-policy', policyController.GetPolicy)


module.exports = router;
