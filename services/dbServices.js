const { sequelize, UserRegister, UserRelation } = require('../models/dbModels');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');

const userRegistration = async (mobileNo, name, username, password) => {
    try {
        const registration = await UserRegister.create({
            mobileNo: mobileNo,
            name: name,
            username: username,
            password: password
        });
        return registration.userId;
    } catch (error) {
        return error;
    }
}

const userAuthentication = async (username, password) => {
    const user = await UserRegister.findOne({ where: { username } });

    if (user.username) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        } throw Error('incorrect password');
    } throw Error('incorrect username');
}

const editUserProfile = async (userId, mobileNo, name, email, aboutYou, profilePicture) => {
    const isUpdated = await UserRegister.update({ mobileNo, name, email, aboutYou, profilePicture }, {
        where: {
            userId
        }
    });
    return isUpdated[0];
}

const deleteUserProfile = async (userId) => {
    const isDeleted = await UserRegister.destroy({
        where: {
            userId
        }
    });
    return isDeleted;
}

const findFilePath = async (id) => {
    const result = await UserRegister.findOne({
        attributes: ['profilePicture'],
        where: {
            userId: id
        }
    });
    return result.profilePicture;
}

const getUsers = async (userId) => {
    const result = await UserRegister.findAll({
        attributes: ['userId', 'name', 'username', 'aboutYou'],
        where: {
            userId: { [Op.ne]: userId }
        }
    });
    return result;
}

const followUserById = async (userId, id) => {
    try {
        if (userId != id) {
            const result = await UserRelation.create({
                userId,
                followingId: id
            });
            return Number(result.followingId);
        } throw Error('You can not follow yourself in this app. But in real world you must follow yourself first!!!');
    } catch (error) {
        return error;
    }
}

const getFollowingUsers = async (userId) => {
    const query = `SELECT u.userId, u.name, u.username, u.aboutYou FROM userRelations as ur INNER JOIN userRegisters as u ON ur.followingId = u.userId WHERE ur.userId = ${userId}`;
    const [results, metadata] = await sequelize.query(query);
    return results;
}

const getFollowerUsers = async (userId) => {
    const query = `SELECT u.userId, u.name, u.username, u.aboutYou FROM userRelations as ur INNER JOIN userRegisters as u ON ur.userId = u.userId WHERE ur.followingId = ${userId}`;
    const [results, metadata] = await sequelize.query(query);
    return results;
}


const unfollowingUser = async (id, userId) => {
    const isUnfollowed = await UserRelation.destroy({
        where: {
            userId,
            followingId: id
        }
    });
    return isUnfollowed;
}

module.exports = { userRegistration, userAuthentication, editUserProfile, deleteUserProfile, findFilePath, getUsers, followUserById, getFollowingUsers, getFollowerUsers, unfollowingUser }