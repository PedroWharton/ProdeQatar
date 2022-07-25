//express
const express = require('express');
const router = express.Router();

//controler
const predictionController = require('../controllers/predictionController')

//middleware
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

//routes
router.get('/', authMiddleware, predictionController.prediction)


//exports
module.exports = router;