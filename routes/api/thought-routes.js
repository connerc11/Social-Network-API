const router = require('express').Router();

const {
    createThought,
    findThoughtbyId,
    findThought,
    updateThought,
    deleteThought

} = require('../../controllers/thought-controller');


router.route('/')
.get(findThought)
.post(createThought)

router.route('/:id')
.get(findThoughtbyId)
.put(updateThought)
.delete(deleteThought)

module.exports = router;