const router = require('express').Router();

const {
    createUser,
    findUserbyId,
    findUsers,
    updateUser,
    deleteUser,
    addNewFriend,
    deleteFriend,

} = require('../../controllers/user-controllers');

router.route('/')
.get(findUsers)
.post(createUser);

router.route('/:id')
.get(findUserbyId)
.put(updateUser)
.delete(deleteUser);

router.route('/:id/friends/:friendId')
.post(addNewFriend)
.delete(deleteFriend);

module.exports = router;