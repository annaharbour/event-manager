const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');
const Assignment = require('../../models/Assignment');
// @route GET api/profile/me
//@desc Get current users profile
// @access Private

router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'isAdmin']);

        if(!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }

        // Get the assignments for this user so we can display on the dashboard
        const assignments = await Assignment.find({assignedTo: {$in: [profile.user._id]}});

        res.json({profile, assignments});
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
    async(req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
        }
     const {
      // spread the rest of the fields we don't need to check
      ...rest
    } = req.body;
    //build a profile object
    const profileFields = {
        user: req.user.id,
        ...rest
    };
    try {
        //Using upsert option (creates new doc if no match is found)
        let profile = await Profile.findOneAndUpdate(
            {user: req.user.id},
            {$set: profileFields},
            {new: true, upsert: true, setDefaultsOnInsert: true}
        );
        console.log(profile)
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
      const assignments = await Assignment.find({assignedTo: {$in: [req.params.user_id]}});
      res.json({profile, assignments});
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
// router.delete('/', auth, async (req, res) => {
//     try {
//     //remove users posts
//       await Post.deleteMany({ user: req.user.id })
//     //remove profile
//       await Profile.findOneAndRemove({user: req.user.id});
//       //remove user
//       await User.findOneAndRemove({ _id: req.user.id});
//       res.json({ msg: 'User deleted'});
//     } catch(err){
//         console.error(err.message);
//         if(err.kind == 'ObjectId') {
//             return res.status(400).json({ msg: 'Profile not found'});
//         }
//         return res.status(500).send('Server error');
//     }
// });
router.delete('/', auth, async (req, res) => {
  try {
  //remove users posts
    await Post.deleteMany({ user: req.user.id })
  //remove profile
    await Profile.findOneAndRemove({user: req.user.id});

 // Find assignments assigned to the user
 const assignments = await Assignment.find({ assignedTo: req.user.id });

 // Remove the user from assignedTo array for each assignment
 const updatePromises = assignments.map((assignment) => {
   assignment.assignedTo = assignment.assignedTo.filter(
     (assignedUserId) => assignedUserId.toString() !== req.user.id
   );
   return assignment.save();
 });

 // Wait for all assignment updates to complete
 await Promise.all(updatePromises);


    //remove user
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

//@route PUT api/profile/assignment
//@desc Add profile assignment
//@access Private
router.put(
    '/assignment',
    auth,
    [
      check('day1am', 'Sign up for at least one volunteer slot').custom((value, { req }) => {
        if (!value && !req.body.day1pm && !req.body.day2am && !req.body.day2pm && !req.body.day3am && !req.body.day3pm) {
          throw new Error('At least one volunteer slot must be selected');
        }
        return true;
      }),
      check('day1pm', 'Sign up for at least one volunteer slot').custom((value, { req }) => {
        if (!value && !req.body.day1am && !req.body.day2am && !req.body.day2pm && !req.body.day3am && !req.body.day3pm) {
          throw new Error('At least one volunteer slot must be selected');
        }
        return true;
      }),
      check('day2am', 'Sign up for at least one volunteer slot').custom((value, { req }) => {
        if (!value && !req.body.day1am && !req.body.day1pm && !req.body.day2pm && !req.body.day3am && !req.body.day3pm) {
          throw new Error('At least one volunteer slot must be selected');
        }
        return true;
      }),
      check('day2pm', 'Sign up for at least one volunteer slot').custom((value, { req }) => {
        if (!value && !req.body.day1am && !req.body.day1pm && !req.body.day2am && !req.body.day3am && !req.body.day3pm) {
          throw new Error('At least one volunteer slot must be selected');
        }
        return true;
      }),
      check('day3am', 'Sign up for at least one volunteer slot').custom((value, { req }) => {
        if (!value && !req.body.day1am && !req.body.day1pm && !req.body.day2am && !req.body.day2pm && !req.body.day3pm) {
          throw new Error('At least one volunteer slot must be selected');
        }
        return true;
      }),
      check('day3pm', 'Sign up for at least one volunteer slot').custom((value, { req }) => {
        if (!value && !req.body.day1am && !req.body.day1pm && !req.body.day2am && !req.body.day2pm && !req.body.day3am) {
          throw new Error('At least one volunteer slot must be selected');
        }
        return true;
      })
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        const profile = await Profile.findOne({ user: req.user.id });

        profile.assignment.unshift(req.body);

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
router.delete('/assignment/:exp_id',
    auth,
    async (req, res) => {
        try {
            const profile = await Profile.findOne({ user: req.user.id });

            //Get remove index
            const removeIndex = profile.assignment.map(item => item.id).indexOf(req.params.exp_id);

            profile.assignment.splice(removeIndex, 1);

            await profile.save()

            res.json(profile);

        } catch(err){
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
)




module.exports = router;
