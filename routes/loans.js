const express = require('express');
const router = express.Router();
const loansController = require('../controller/loansController');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  return await loansController.allLoans(req, res);
});

router.post('/new', async function(req, res, next) {
  return await loansController.newLoan(req, res);
});

router.post('/return', async function(req, res, next) {
  return await loansController.returnLoan(req, res);
});

module.exports = router;
