const mongoose = require('mongoose');
const db = 'mongodb://localhost:27017/vueTube';

module.exports = () => {
    mongoose.connect(db, {useNewUrlParser : true})
    .then(() => console.log(`MongoDB connected`))
    .catch((err) => console.warn(err));
};