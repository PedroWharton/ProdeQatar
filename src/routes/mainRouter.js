const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController')

//RUTAS
router.get('/', mainController.index)

module.exports = router;