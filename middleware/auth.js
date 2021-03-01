const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'TOKEN');
        const userid = decoded.userID;
        res.locals.user = userid;
        next();
    } catch (e) {
        res.status(401).json({err: "invalid token"});
    }
}