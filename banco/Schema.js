const mongoose = require('mongoose')
const Schema = mongoose.Schema;
mongoose.connect('mongodb+srv://ony:awesomedevs@cluster0-kdaqw.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true
})

const User = new Schema({
    _id: {type: String, required: true},
    coins: {type: Number, default: 1000000},
    xp: { type: Number, default: 0 },
    rank: {type: Number, default: 1},
    timedaily:  { type: String, default: '0000000000000' },
    ban: { type: Boolean, default: false }
})

var Users = mongoose.model("Users", User);
exports.Users = Users
