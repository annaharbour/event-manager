const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator');
const checkObjectId = require('../../middleware/checkObjectId')

const Profile = require('../../models/Profile');
const User = require('../../models/User')
const Post = require('../../models/Post')
// @route GET api/profile/me
//@desc Get current users profile
// @access Private

router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name']);

        if(!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    };
});

// @route POST api/profile
//@desc Create or update user profile
// @access Private
router.post('/', 
    auth, 
    check('status', 'Status is required').notEmpty(),
    check('skills', 'Skills is required').notEmpty(),
    async(req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
        }
     const {
      skills,
      facebook,
      instagram,
      // spread the rest of the fields we don't need to check
      ...rest
    } = req.body;
    //build a profile object
    const profileFields = {
        user: req.user.id,
        skills: Array.isArray(skills) 
        ? skills 
        : skills.split(',').map((skill) => '' + skill.trim()),
        ...rest
    };
    //create social fields object
    const socialFields = { facebook, instagram };
    //add social fields object to profile fields object
    profileFields.social = socialFields;
    try {
        //Using upsert option (creates new doc if no match is found)
        let profile = await Profile.findOneAndUpdate(
            {user: req.user.id},
            {$set: profileFields},
            {new: true, upsert: true, setDefaultsOnInsert: true}
        );
        return res.json(profile);    
    } catch(err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
});

//@route GET api/profile
//@desc Get all profiles
//@access Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});



//@route GET api/profile/user/:user_id
//@desc Get profile by user id
//@access Public
router.get('/user/:user_id', async (req, res) => {
    try {
      const profile = await Profile.findOne({user: req.params.user_id}).populate('user', ['name']);
      if(!profile){
        return res.status(400).json({ msg: 'Profile not found'});
      }
      res.json(profile);
    } catch(err){
        console.error(err.message);
        if(err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found'});
        }
        return res.status(500).send('Server error');
    }
});



//@route DELETE api/profile
//@desc Delete profile, user, and posts
//@access Private
router.delete('/', auth, async (req, res) => {
    try {
    //remove users posts
      await Post.deleteMany({ user: req.user.id })
    //remove profile
      await Profile.findOneAndRemove({user: req.user_id});
      await User.findOneAndRemove({ _id: req.user.id});
      res.json({ msg: 'User deleted'});
    } catch(err){
        console.error(err.message);
        if(err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found'});
        }
        return res.status(500).send('Server error');
    }
});

//@route PUT api/profile/experience
//@desc Add profile experience
//@access Private
router.put(
    '/experience',
    auth,
    check('company', 'Company is required').notEmpty(),
    check('location', 'Location is required').notEmpty(),
    check('title', 'Title is required').notEmpty(),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }


    //    const { company, location, title} = req.body;
    //    const newExp = {company, location, title};
  
      try {
        const profile = await Profile.findOne({ user: req.user.id });
          
        profile.experience.unshift(req.body);
  
        await profile.save();
  
        res.json(profile);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );

//@route DELETE api/profile/experience
//@desc Delete profile experience
//@access Private
router.delete('/experience/:exp_id',
    auth,
    async (req, res) => {
        try {
            const profile = await Profile.findOne({ user: req.user.id });
            
            //Get remove index
            const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);
            
            profile.experience.splice(removeIndex, 1);
            
            await profile.save()
            
            res.json(profile);

        } catch(err){
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
)

//@route PUT api/profile/education  
//@desc Add profile education
//@access Private
router.put(
    '/education',
    auth,
    check('school', 'School is required').notEmpty(),
    check('degree', 'Degree is required').notEmpty(),
    check('fieldofstudy', 'Field of study is required').notEmpty(),
    check('from', 'From date is required and needs to be from the past')
        .notEmpty()
        .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }


    //    const { school, degree, fieldofstudy, from, to, current, description } = req.body;
    //    const newEdu = {school, degree, fieldofstudy, from, to, current, description};
  
      try {
        const profile = await Profile.findOne({ user: req.user.id });
          
        profile.education.unshift(req.body);
  
        await profile.save();
  
        res.json(profile);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );

//@route DELETE api/profile/education
//@desc Delete profile education
//@access Private
router.delete('/education/:edu_id',
    auth,
    async (req, res) => {
        try {
            const foundProfile = await Profile.findOne({ user: req.user.id });
            
            //Get remove index
            foundProfile.education = foundProfile.education.filter(
                (edu) => edu._id.toString() !== req.params.edu_id
              );
              await foundProfile.save();
              return res.status(200).json(foundProfile);
        } catch(err){
            console.error(err.message);
            res.status(500).send({msg: 'Server Error'});
        }
    });



module.exports = router;