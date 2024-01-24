const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const maxAge = 1 * 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({ id }, 'It is my secret', {
        expiresIn: maxAge
    });
}

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    return password;
}

module.exports = { maxAge, createToken, hashPassword }