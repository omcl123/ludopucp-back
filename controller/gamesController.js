import models from '../models';

async function allGames(req, res){
	try {
		const games = await models.Boardgame.find();
		const gamesWithState = await Promise.all(games.map(async (item) => { 
			let loanExists = await models.Loan.isLoaned(item.id);
			let game = {};
			game.id = item.id;
			game.name = item.name;
			game.code = item.code
			
			if (loanExists === -1){
				game.state = 'available';
			} else {
				game.state = 'loaned';
			}
			console.log(game);
			return game;
		})); 
  	return res.status(200).send(gamesWithState);

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