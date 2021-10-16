const { User } = require ('../models');
const { populate } = require("../models/User")

const userControls = {
    createUser({body}, res) {
        User.create(body)
        .then(dbUsersData => res.json(dbUsersData))
        .catch(err => res.status(400).json(err));
    },
    findUsers(req, res) {
        User.find({})
        .populate({
            path: 'thoughts', 
            select: '-__v'
        }).select('-__v')
        .then(dbUsersData => res.json(dbUsersData))
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
    },
    findUserbyId({ params }, res) {
        User.findOne({_id: params.id})
        .populate({
            path: 'thoughts',
            select: '-__v',
        })
        .populate({
            path: 'friends',
            select: '-__v',
        })
        .select('-__v')
        .then(dbUsersData => {
            if(!dbUsersData) {
                res.status(404).json({message: 'No user found with ID'})
                return;
            }
            res.json(dbUsersData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
    },
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
          .then(dbUsersData => {
            if (!dbUsersData) {
              res.status(404).json({ message: 'No user can be updated!' });
              return;
            }
            res.json(dbUsersData);
          })
          .catch(err => res.json(err));
      },
      deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
          .then(dbUsersData => res.json(dbUsersData))
          .catch(err => res.json(err));
      }

};


module.exports = userControls;