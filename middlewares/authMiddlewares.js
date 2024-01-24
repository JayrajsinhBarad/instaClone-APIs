const jwt = require('jsonwebtoken');
const {UserRegister} = require('../models/dbModels');

const requireToken = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, 'It is my secret', (err, decodedToken) => {
            if(err){
                res.status(401).json({
                    goTo: "http://localhost:3000/signin/"
                });
            }else{
                next();
            }
        });
    }else{
        res.status(401).json({
            goTo: "http://localhost:3000/signin/"
        });
    }
}

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, 'It is my secret', async(err, decodedToken) => {
            if(err){
                res.locals.user = null;
                next();
            }else{
                const response = await UserRegister.findOne({
                    where: {userId: decodedToken.id}
                });
                res.locals.user = response.username;
                res.locals.id = decodedToken.id;
                next();
            }
        });
    }else{
        res.locals.user = null;
        next();
    }
}

module.exports = {requireToken, checkUser}