const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Assignment = require('../../models/Assignment');
const User = require("../../models/User");
const capitalize = require("../../utils/capitalize");
const { error } = require('console');

router.get('/', auth, async (req, res) => {
  // const user = await User.findById('64a70d8f7b340903292e235f');
  const allAssignments = await Assignment.find({}).populate({path: 'assignedTo', select: 'name'}).sort({day: 1, ampm: 1});

  res.json({assignments: allAssignments});
});

router.patch('/:id', auth, async (req, res) => {
  let response = false;
  let message = 'You have been assigned';
  const population = {path: 'assignedTo', select: 'name'};

  // if the user submitting the request is an admin and we have selectedUser in the request body
  // then we are NOT assigning the "current user" we selected a different one. So find that user
  // and assign to that user
  const currentUser = await User.findById(req.user.id);
  const userIdToAssign = currentUser.isAdmin && !!req.body.selectedUser ? req.body.selectedUser : req.user.id;

  // find the requested assignment
  const assignment = await Assignment.findOne({_id: req.params.id}).populate(population);
  if(assignment.assignedTo.length >= assignment.maxAssignees){
    res.json({success: false, message: 'This time slot is full'})
    return
  }
  // find the same assignment where the requested user is already assigned, this will be null if that is not the case
  const isAlreadyAssigned = await Assignment.findOne({assignedTo: [userIdToAssign], day: assignment.day, ampm: assignment.ampm}).populate(population);

  // if we found the assignment (which we should always), but we didn't find the same assignment where the user is assigned to it
  // then proceed to assign a user to that assignment
  if (assignment && !isAlreadyAssigned) {
    // let's create a variable to will be set to the user we want to assign. As a default we'll set it to the current user we
    // queried for above.
    let userToAssign = currentUser;

    // if the user is an admin and we have sent a selectedUser in the request, then find the user with the ID of `selectedUser`
    // if that user is there, override userToAssign with that user
    if (currentUser.isAdmin && req.body.selectedUser) {
      userToAssign = await User.findById(req.body.selectedUser);
    }

    // time to update the assignment with the assignTo set to the user we want to assign
    response = await Assignment.updateOne({_id: req.params.id}, {$push: {assignedTo: userToAssign}});
  } else if (assignment && isAlreadyAssigned) {
    message = `You are already assigned to a job on ${capitalize(assignment.day)} ${assignment.ampm.toUpperCase()}.`;
  }

  res.json({success: response, message})
});

router.delete('/:id', auth, async (req, res) => {
  let userId = req.user.id
  const currentUser = await User.findById(userId);
  console.log({currentUser, isAdmin : currentUser.isAdmin, selectedUserId: req.body.selectedUserId})
  if(currentUser.isAdmin && req.body.selectedUserId){
    console.log('Removing user', req.body.selectedUserId)
    userId = req.body.selectedUserId

  }


  const response = await Assignment.findOneAndUpdate(
    {_id: req.params.id},
    {$pull: {assignedTo: userId}}
  );

  res.json({success: response});
});

module.exports = router;
