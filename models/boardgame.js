import mongoose from 'mongoose';
const boardgameSchema = new mongoose.Schema({
  name: {
    type: String
  },
  code: {
    type: Number,
    unique:true
  }

});

boardgameSchema.statics.findByCode = async function (code) {
  let game = await this.findOne({
    code: code,
  });
  if (!game) {
    return -1;
  }
  return game;
};

boardgameSchema.pre('remove', function(next) {
  this.model('Loan').deleteMany({ boardgame: this._id }, next);
});

const Boardgame = mongoose.model('Boardgame', boardgameSchema);
export default Boardgame;