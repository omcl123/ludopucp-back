const express = require('express');
const router = express.Router();
const gamesController = require('../controller/gamesController');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  return await gamesController.allGames(req, res);
});

router.post('/register', async function(req, res, next) {
  return await gamesController.registerGame(req, res);
});

module.exports = router;
