const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('./../models/User');
const userDataValidaton = require('./../utils/validation/userDataValidation');

router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const userFromDb = await User.findOne({ email });
        const errors = userDataValidaton(email, password);
    
        if(errors.size > 0) {
            return res.status(400).json(errors);
        }
    
        if(userFromDb) {
            return res.status(400).json({message: 'User already exists'});
        }
    
        console.log(password);
        const createdUser = await User.create({ email: email, password: password } );
    
        return res.status(200).json(createdUser);
    } catch(err) {
        console.log(err);
        return res.status(500).send({ message: err.message });
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
            return res.status(400).json({ message: 'Invalid credentials' });
        }
    
        const isValidPassword =  await user.isValidPassword(password);
    
        if(!isValidPassword) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
    
        const payload = { _id: user._id, email: user.email };
        const token =  await jwt.sign(payload, process.env.SECRET_OR_KEY);
    
        res.json({ token: `Bearer: ${token}` });
    } catch(err) {
        return res.status(500).send({ message: err.message });
    }
});


module.exports = router;