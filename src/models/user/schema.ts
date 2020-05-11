import mongoose from 'mongoose';
import { EMAIL } from '../../utils/regexes';
const Schema = mongoose.Schema;

const schema = new Schema({
  email: {
    type: String,
    required: [true],
    unique: true,
    validate: {
      validator: (email: string) => EMAIL.test(email),
      message: 'Field [email] wrong format.'
    }
  },
  profile: {
    fullName: {
      type: String,
      required: [true]
    },
    avatar: {
      type: String
    }
  }
});

export default schema;
