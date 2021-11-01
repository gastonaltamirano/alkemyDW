const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
    const token = req.header('authorization');
    if(!token) res.send('access denied');

    jwt.verify(token, process.env.SECRET, (err, user) => {
        if(err) res.send('error, token invalid or expired');
        else {
            req.user = user;
            next();
        }
    });
};

module.exports = {
    validateToken
};