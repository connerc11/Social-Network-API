const router = require('express').Router();

const {
    createThought,
    findThoughtbyId,
    findThought,
    updateThought,
    deleteThought,
    createReaction,
    removeReaction

} = require('../../controllers/thought-controller');


router.route('/')
.get(findThought)
.post(createThought)

router.route('/:id')
.get(findThoughtbyId)
.put(updateThought)
.delete(deleteThought)

router.route('/:thoughtId/reactions')
.post(createReaction);
router.route('/:thoughtId/reactions/:reactionId')
.delete(removeReaction);


module.exports = router;