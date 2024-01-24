const { maxAge, createToken, hashPassword } = require('../static/statics');
const { userRegistration, userAuthentication } = require('../services/dbServices');

module.exports.signUp = async (req, res) => {
    let { mobileNo, name, username, password } = req.body;
    password = await hashPassword(password);
    const result = await userRegistration(mobileNo, name, username, password);

    if (typeof result === 'number') {
        res.status(200).json({
            success: true,
            message: `Data added successfully with an id: ${result}`
        });
    } else {
        res.status(400).json({
            success: false,
            message: result.message
        });
    }
}

module.exports.signIn = async (req, res) => {
    const { username, password } = req.body;
    if (res.locals.user === username) {
        res.json({
            message: `You are already logged in.`
        });
    } else {
        try {
            const user = await userAuthentication(username, password);
            const token = createToken(user.userId);
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
            return res.status(200).json({
                success: true,
                message: `Welcome to our Insta-Clone webapp, ${user.username}!`
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports.logout = async(req, res) => {
    if(res.locals.user){
        res.cookie('jwt', '', {maxAge: 1});
        res.status(200).json({
            message: `You are logged out.`
        });
    }else{
        res.status(400).json({
            message: `You are not logged in.`
        });
    }
}