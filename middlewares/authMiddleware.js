const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next)=>{
    const token = req.cookies.token

    if(!token) return res.redirect('/login')

    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    req.user = decoded
    next()
}

module.exports = authMiddleware