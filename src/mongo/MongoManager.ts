const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

class MongoManager {
  constructor() {}
  getMongoUrl() {
    return process.env.MONGODB_URI;
  }
  connect() {
    return mongoose
      .connect(this.getMongoUrl())
      .then(() => console.log('Connection to database established'))
      .catch((error: string) => console.log('An error has occurred: ' + error));
  }
}

const mongoManager = new MongoManager();

export default mongoManager;
