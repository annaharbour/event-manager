const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');


//Bring user model in
const User = require('../../models/User');

// @route GET api/users
//@desc Register user
// @access Public

router.post(
    '/',
    [
    check('name', 'Name is required').notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('phone', 'Please include a valid phone number').notEmpty({min: 9}),
    check('password', 'Please enter a password with 6 or more characters').isLength({min: 6}),
],
   async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

const {name, email, phone, password} = req.body;

try {
    let user = await User.findOne({ email });
    // See if user exists
    if(user){
        return res.status(400).json({errors: [{msg: 'User already exists'}]});
    }

    //Create new user instance
    user = new User({
        name, email, password, phone
    });
    // Encrypt password
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Return jsonwebtoken
    const payload = {
        user: {
            id: user.id
        }
    }
    jwt.sign(
        payload,
        process.env.jwtSecret,
        { expiresIn: 360000 },
        (err, token) => {
            if(err) throw err;
            res.json({ token });
        });
} catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
}

});

module.exports = router;
