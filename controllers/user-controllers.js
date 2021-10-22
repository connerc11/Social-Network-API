const { User, Types } = require('../models');
const mongoose = require('mongoose');

const userControls = {
    //test and ran 
    findUsers(req, res) {
        User.find({})
        .populate({
            path: 'thoughts', 
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
    },
    //tested and works
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => {
            console.log('test', dbUserData)
            return res.json(dbUserData)
        })
        .catch(err => res.status(400).json(err));
    },
    //tested and works
    findUserbyId({ params }, res) {
        User.findOne({ _id: params.id})
        .populate({
            path: 'thoughts',
            select: '-__v',
        })
        .populate({
            path: 'friends',
            select: '-__v',
        })
        .select('-__v')
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'No user found with ID'})
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
    },
    //tested and worked
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user can be updated!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.json(err));
      },
      //tested and worked
      deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
          .then(dbUserData => res.json(dbUserData))
          .catch(err => res.json(err));
      },
      //tested and worked
      addNewFriend({ params }, res) {
          User.findOneAndUpdate(
              { _id: params.id },
              { $addToSet: { friends: params.friendId} },
              {runValidators: true}
          ).then(dbUserData => {
              if (!dbUserData) {
                  res.status(400).json({ message: "There has been no user found"})
                  return;
              }
              res.json(dbUserData)
          })
          .catch(err => res.status(400).json(err));
      },
      //tested doesn't delete friend 
      deleteFriend({ params }, res) {
    User.findOneAndUpdate({ _id: params.id },
    {$pull: { friends: params.friendId }}, 
    { runValidators: true})
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: "Cannot find a user with this Id"});
            return;
        }res.json(dbUserData)
    }).catch(err => res.status(400).json(err));
      }

};


module.exports = userControls;