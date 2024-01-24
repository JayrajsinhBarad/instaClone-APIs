const fs = require('fs').promises;
const { editUserProfile, deleteUserProfile, findFilePath, getUsers, followUserById, getFollowingUsers, getFollowerUsers, unfollowingUser } = require('../services/dbServices');
const { deleteFile } = require('../static/statics');

module.exports.editProfile = async (req, res) => {
    const userId = res.locals.id;
    const { mobileNo, name, email, aboutYou } = req.body;
    const profilePicture = req.file.path;
    const isProfileUpdated = await editUserProfile(userId, mobileNo, name, email, aboutYou, profilePicture);
    if (isProfileUpdated) {
        res.status(200).json({
            success: true,
            message: `Data updated successfully.`
        });
    } else {
        res.status(200).json({
            success: false,
            message: `Something went wrong.`
        });
    }
}

module.exports.deleteUser = async (req, res) => {
    const userId = res.locals.id;
    const filePath = await findFilePath(userId);
    await fs.unlink(filePath);
    const isDataDeleted = await deleteUserProfile(userId);
    if (isDataDeleted) {
        res.cookie('jwt', '', { maxAge: 1 });
        res.status(200).json({
            success: true,
            message: `Data deleted successfully.`
        });
    } else {
        res.status(200).json({
            success: false,
            message: `Something went wrong.`
        });
    }
}

module.exports.getUserList = async (req, res) => {
    const userId = res.locals.id;
    const userList = await getUsers(userId);
    res.status(200).json({
        success: true,
        data: userList
    });
}

module.exports.followUser = async (req, res) => {
    const { id } = req.params;
    const userId = res.locals.id;

    const result = await followUserById(userId, id);

    if (typeof result === 'number') {
        res.status(200).json({
            success: true,
            message: `You followed to a user who has userId ${result}`
        });
    } else {
        res.status(400).json({
            success: false,
            message: result.message
        });
    }
}

module.exports.getFollowingList = async (req, res) => {
    const userId = res.locals.id;

    const followingList = await getFollowingUsers(userId);

    res.status(200).json({
        success: true,
        Followings: followingList
    })
}

module.exports.getFollowerList = async (req, res) => {
    const userId = res.locals.id;

    const followerList = await getFollowerUsers(userId);

    res.status(200).json({
        success: true,
        Followers: followerList
    })
}

module.exports.unfollowUser = async (req, res) => {
    const { id } = req.params;
    const userId = res.locals.id;

    const isUnfollowed = await unfollowingUser(id, userId);

    if (isUnfollowed) {
        res.status(200).json({
            success: true,
            message: `User has been unfollowed successfully.`
        });
    } else {
        res.status(400).json({
            success: false,
            message: `Something went wrong.`
        });
    }
}