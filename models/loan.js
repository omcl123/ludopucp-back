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
const Loan = mongoose.model('Loan', loanSchema);
export default Loan;