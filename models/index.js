import mongoose from 'mongoose';
import Boardgame from './boardgame';
import Loan from './loan';
const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});
};
const models = { Boardgame, Loan };
export { connectDb };
export default models;