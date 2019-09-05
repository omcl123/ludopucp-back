import mongoose from 'mongoose';
const loanSchema = new mongoose.Schema({
  person: {
    type: String,
    required: true,
  },
  state: {
  	type: Boolean,
  	required: true,
  },
  boardgame: { type: mongoose.Schema.Types.ObjectId, ref: 'Boardgame' },
});

loanSchema.statics.findLoan = async function (person, boardgame) {
  console.log(person);
  console.log(boardgame);
  const loan = await this.findOne({
    person: person,
    state:true,
    boardgame:boardgame
  });
  if (!loan) {
    return -1;
  }
  return loan;
};

loanSchema.statics.isLoaned = async function ( boardgame) {
  const loanExists = await this.findOne({
    state:true,
    boardgame:boardgame
  });
  if (!loanExists) {
    return -1;
  }
  return 1;
};


const Loan = mongoose.model('Loan', loanSchema);
export default Loan;