const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

class MongoManager {
  constructor() {}
  getMongoUrl() {
    return process.env.MONGODB_URI;
  }
  connect() {
    return mongoose
      .connect(this.getMongoUrl())
      .catch(error => console.log("An error has occurred"));
  }
}

const mongoManager = new MongoManager();

module.exports = { mongoManager };
