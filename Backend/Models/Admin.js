const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost:27017/BlockVotes';
mongoose.connect(mongoDB,{ useNewUrlParser: true });

const bcrypt = require('bcrypt');
const saltRounds = 10;
//Define a schema
const Schema = mongoose.Schema;
const AdminSchema = new Schema({
    email: {                            
        type: String,
        required: true
    },
    password: {                         
        type: String,
        required: true
    }
});
// hash user password before saving into database
AdminSchema.pre('save', function(cb){
this.password = bcrypt.hashSync(this.password, saltRounds);
cb();
});
module.exports = mongoose.model('AdminList', AdminSchema);