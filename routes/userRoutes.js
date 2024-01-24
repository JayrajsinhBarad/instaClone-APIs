const { Router } = require('express');
const router = Router();
const userController = require('../controllers/userController');
const upload = require('../middlewares/upload');

router.patch('/edit-profile', upload.single("profilePicture"), userController.editProfile);
router.delete('/delete-profile', userController.deleteUser);
router.get('/get-user-list', userController.getUserList);
router.post('/follow-user/:id', userController.followUser);
router.get('/get-following-user-list', userController.getFollowingList);
router.get('/get-follower-user-list', userController.getFollowerList);
router.delete('/unfollow-user/:id', userController.unfollowUser);

module.exports = router;