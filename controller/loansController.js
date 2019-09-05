import models from '../models';


async function allLoans(req, res){
	try {
		const loans = await models.Loan.find();
  	return res.status(200).send(loans);

	} catch (e) {
		return res.status(500).send(e.message);
	}
}

async function newLoan(req, res){
	try {
		const game = await models.Boardgame.findByCode(req.body.boardgame);
		console.log(game);
		const loan = await models.Loan.findLoan(req.body.person,game.id);
		if (loan === -1) {
			return res.status(500).send("game already in use");	
		}
		const newLoan = await models.Loan.create({
			person: req.body.person,
			state: true,
			boardgame: game.id
		});
  	return res.status(200).send(newLoan);

	} catch (e) {
		return res.status(500).send(e.message);
	}
}

async function returnLoan(req, res){
	try {
		const game = await models.Boardgame.findByCode(req.body.boardgame);
		console.log(game);
		const loan = await models.Loan.findLoan(req.body.person,game.id);
		if (loan === -1){
			return res.status(500).send("could not find loan");	
		}
		console.log(loan);
		loan.state = false;
		await loan.save();

		return res.status(200).send(loan);
	} catch (e) {
		return res.status(500).send(e.message);
	}
}

module.exports = {
	allLoans: allLoans,
	newLoan: newLoan,
  returnLoan: returnLoan
};