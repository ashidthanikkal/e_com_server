const jwt = require('jsonwebtoken')

exports.jwtMiddleware = (req, res, next) => {
    console.log("______jwtMiddleware_____");
    try {
        const token = req.headers['access_token'].split(" ")[1]
        const response = jwt.verify(token, process.env.JWT_KEY)
        req.payload = response.uid
        next()
    }
    catch {
        res.status(401).json("authentication filed please login")
    }

}