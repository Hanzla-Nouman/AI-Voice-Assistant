const express = require('express');
const router = express.Router();
const { getContentController } = require('../controllers/getContentController');

router.post('/', getContentController);

module.exports = router;
