import mongoose from 'mongoose';
const boardgameSchema = new mongoose.Schema({
  name: {
    type: String
  }
});


boardgameSchema.pre('remove', function(next) {
  this.model('Loan').deleteMany({ boardgame: this._id }, next);
});

const Boardgame = mongoose.model('Boardgame', boardgameSchema);
export default Boardgame;