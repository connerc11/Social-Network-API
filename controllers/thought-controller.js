const { Thought, User} = require('../models');

const thoughtsController = {
    createThought({params, body}, res) {
        Thought.create(body)
        .then(({_id}) => {
            return User.findOneAndUpdate({_id: params.userId}, {$push: {thoughts: _id}}, {new: true});
        })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
            res.status(404).json({message: 'no thought can be created'});
            return;
        }
        res.json(dbThoughtData);
    }).catch(err => res.json(err));
},
    findThought(req, res) {
        Thought.find({})
        .populate({
            path: 'user',
            select: '_v'
        })
        .select('-__v')
        .then(dbThoughtsData => res.json(dbThoughtsData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        })
    },
    findThoughtbyId({ params }, res) {
        Thought.findOne({_id: params.id})
        .populate({
            path: 'user',
            select: '-__v',
        })
        .select('-__v')
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
      }

}

module.exports = thoughtsController