import models from '../models';

async function allGames(req, res){
	try {
		const users = await models.Boardgame.find();
  	return res.status(200).send(users);

	} catch (e) {
		return res.status(500).send(e.message);
	}
}

async function registerGame(req, res){
	try {
		const newGame = await models.Boardgame.create({
				name: req.body.name,
				code: req.body.code
			})

		return res.status(200).send(newGame);
	} catch (e) {
		return res.status(500).send(e.message);
	}
}


module.exports = {
	allGames: allGames,
  registerGame: registerGame
};