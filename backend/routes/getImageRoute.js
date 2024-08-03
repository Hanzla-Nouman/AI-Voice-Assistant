const express = require('express');
const router = express.Router();
const {generateImageCont} = require('../controllers/generateImageCont');
 
router.post('/',generateImageCont)
 
module.exports = router;            