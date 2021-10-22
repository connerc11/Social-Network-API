const { Thought, User, Types } = require('../models');
const mongoose = require('mongoose')

const thoughtsController = {
    //code ran
    createThought({params, body}, res) {
        Thought.create(body)
        .then(({_id}) => {
            return User.findOneAndUpdate({username: body.username}, {$push: {thoughts: _id}}, {new: true});
        })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
            res.status(404).json({message: 'no thought can be created'});
            return;
        }
        res.json(dbThoughtData);
    }).catch(err => res.json(err));
},
//code ran 
    findThought(req, res) {
        Thought.find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        })
    },
    findThoughtbyId({ params }, res) {
        Thought.findOne({_id: params.id})
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: 'No thought found with ID'})
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        })
    },
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
          .then(dbThoughtData => {
            if (!dbThoughtData) {
              res.status(404).json({ message: 'No thought can be updated!' });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => res.json(err));
      },

      deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
          .then(dbThoughtData => res.json(dbThoughtData))
          .catch(err => res.json(err));
      },

      createReaction({params, body}, res ){
          Thought.findOneAndUpdate(
              { _id: params.thoughtId }, 
              {$push: {reactions:body}},
              {new: true, runValidators: true}
          ).then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: "cannot locate a user who has the thought"});
                return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => res.json(err));
      },

      removeReaction({ params }, res) {
          Thought.findOneAndUpdate(
            { _id: params.thoughtId }, 
            {$pull: { reactions: {reactionId: params.reactionId }}},
            {new: true, runValidators: true}
          )
          .then(dbThoughtData => res.json(dbThoughtData))
          .catch(err => res.json(err));
      }

}

module.exports = thoughtsController