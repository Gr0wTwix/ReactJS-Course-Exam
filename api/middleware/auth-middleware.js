const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = () => (req, res, next) => {
    const token = req.cookies[config.COOKIE_NAME];

    try {
        if (token) {
            const userData = jwt.verify(token, config.TOKEN_SECRET);
            req.user = userData;
        }
    } catch(error) {
        console.log(err);
        res.clearCookie(COOKIE_NAME);
        res.status(401).json({ message: 'Invalid token!' });
    }
    next();
}

// const jwt = require('jsonwebtoken');

// module.exports = (req, res, next) => {
//     const token = req.header('X-Authorization');

//     if (!token) {
//         return res.status(401).json({ message: 'You are not authenticated!', status: 401 });
//     }

//     try {
//         const decodedToken = jwt.verify(token, 'gotingotin');
//         req.userId = decodedToken.userId;
//         next();
//     } catch(error) {
//         return res.status(403).json({ message: 'Unauthorized!', status: 403 });
//     }
// }