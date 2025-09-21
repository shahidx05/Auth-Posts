const express = require("express");
const { register, login, profile , logout} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();


router.get("/" , (req, res)=>{res.render('register')})
router.post("/register", register);

router.get("/login", (req, res)=>{
  const token = req.cookies.token
  if(!token) return res.render('login')
  res.redirect('/profile')
})
router.post("/login", login);

router.get("/profile", authMiddleware, profile);

router.get("/logout", logout)

module.exports = router;