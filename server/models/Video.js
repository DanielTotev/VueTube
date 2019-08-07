const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VideoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    uploaderId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    views: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Video', VideoSchema);