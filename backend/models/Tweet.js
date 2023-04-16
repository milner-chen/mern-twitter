const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tweetSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId, // basically a foreign key
        ref: 'User',
    },
    text: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Tweet', tweetSchema);