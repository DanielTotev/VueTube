const router = require('express').Router();
// const User = require('./../models/User');
const Video = require('./../models/Video');
const passport = require('passport');

router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const user = req.user;
    try {
        const email = user.email;
        const videos = await Video.find({ uploaderId: user._id });
        res.status(200).json({ email, videos }); 
    } catch(err) {
        res.status(400).send({ message: err.message });
    }
});

module.exports = router;