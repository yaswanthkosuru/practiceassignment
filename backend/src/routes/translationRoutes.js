const express = require('express');
const router = express.Router();
const translationController = require('../controllers/translationController');

router.get('/translations/:language', translationController.getTranslations);

router.get('/translations/languages', translationController.getSupportedLanguages);

module.exports = router;
