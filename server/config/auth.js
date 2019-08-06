// const passport = require('passport');
// const localStrategy = require('passport-local');
// const User = require('./../models/User');

// passport.use('signup', new localStrategy({
//     usernameField: 'email',
//     passwordField: 'password',
// }, async function(email, password, done) {
//     try {
//         const user = await User.create({ email, password });
//         return done(null, user);
//     } catch(err) {
//         return done(err);
//     }
// }));

// passport.use('login', new localStrategy({
//     usernameField: 'email',
//     passwordField: 'password'
// }, async (email, password, done) => {
//     try {
//         const user = await User.findOne({ email });
//         if(!user) {
//             return done(null, false, { message: 'Wrong credentials' });
//         }

//         const passwordsMatch =  await user.isValidPassword(password);

//         if(!passwordsMatch) {
//             return done(null, false, { message: 'Wrong credentials' });
//         }

//         return done(null, user);
//     } catch(err) {
//         return done(err);
//     }
// }));
const JwtStraegy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret@!+@=jwt@@C$k@';

module.exports = passport => {
    passport.use(new JwtStraegy(opts, async (jwt_payload, done) => {
        try{
             let user = await User.findById(jwt_payload._id);
             
             if(!user) {
                return done(null, false);
             }

             return done(null, user);
    
        } catch(err) {
            return done(err, false);
        }
    }));
};