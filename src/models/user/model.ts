import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
import schema from './schema';

schema.plugin(passportLocalMongoose, {
  usernameField: 'email'
});

const User = mongoose.model('User', schema);
export default User;
