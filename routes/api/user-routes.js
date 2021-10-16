const router = require('express').Router();

const {
    createUser,
    findUserbyId,
    findUsers,
    updateUser,
    deleteUser

} = require('../../controllers/user-controllers');

router.route('/')
.get(findUsers)
.post(createUser);

router.route('/:id')
.get(findUserbyId)
.put(updateUser)
.delete(deleteUser);

module.exports = router;