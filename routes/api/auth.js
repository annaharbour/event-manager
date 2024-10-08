const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const User = require('../../models/User');

// @route GET api/auth
//@desc Test route
// @access Public

router.get('/', auth, async (req, res) => {
    try{
        const user = await User.findById(req.user.id);
        res.json(user);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


//@route POST api/auth
//@desc Authenticate user & get token
//@ access Public
router.post(
    '/',
    [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').exists('password', 'Password is required'),
],
   async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

const { email, password } = req.body;

try {
    let user = await User.findOne({ email }, 'email password');
    // See if user exists
    if(!user){
        return res.status(400).json({errors: [{msg: 'Invalid Credentials'}]});
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
        return res.status(400).json({errors: [{msg: 'Invalid Credentials'}]});
    }

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
