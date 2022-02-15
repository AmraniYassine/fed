const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost:27017/BlockVotes';
mongoose.connect(mongoDB,{ useNewUrlParser: true });
mongoose.Promise = global.Promise;
module.exports = mongoose;