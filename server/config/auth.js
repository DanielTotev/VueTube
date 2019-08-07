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