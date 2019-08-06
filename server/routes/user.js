const router = require('express').Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('./../models/User');
const userDataValidaton = require('./../utils/validation/userDataValidation');
const constants = require('./../constants/appConstants');

router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const userFromDb = await User.findOne({ email });
        const errors = userDataValidaton(email, password);
    
        if(errors.size > 0) {
            return res.status(400).json(errors);
        }
    
        if(userFromDb) {
            return res.status(400).json({messsage: 'User already exists'});
        }
    
        console.log(password);
        const createdUser = await User.create({ email: email, password: password } );
    
        return res.status(200).json(createdUser);
    } catch(err) {
        console.log(err);
        return res.status(500).send({ messsage: err.messsage });
    }

});


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const errors = userDataValidaton(email, password);
    
        if(errors.size > 0) {
            return res.status(400).json(errors);
        }
    
        const user = await User.findOne({ email });
    
        if(!user) {
            return res.status(400).json({ messsage: 'Invalid credentials' });
        }
    
        const isValidPassword =  await user.isValidPassword(password);
    
        if(!isValidPassword) {
            return res.status(400).json({ messsage: 'Invalid credentials' });
        }
    
        const payload = { _id: user._id, email: user.email };
        const token =  await jwt.sign(payload, constants.SECRET_OR_KEY , { expiresIn: 3600 });
    
        res.json({ token: `Bearer: ${token}` });
    } catch(err) {
        return res.status(500).send({ messsage: err.messsage });
    }
});

router.get('/test', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.status(200).send('Congrats!');
});

module.exports = router;