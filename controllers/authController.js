const User = require('../models/userModel')
const Post = require('../models/postModel')
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')

exports.register = async (req, res)=>{
    const{name, email, password} = req.body

    const user = await User.findOne({email})

    if(user) return res.send('user already exists');
 
    const hash = await bcrypt.hash(password, 12);

    const newuser = await User.create({
        name,
        email,
        password:hash
    })

    const token = jwt.sign({email: email}, process.env.JWT_SECRET,{expiresIn: '2h'})

    res.cookie("token", token)

    res.redirect('/profile')
}

exports.login = async (req, res)=>{
    const {email, password} = req.body

    const user = await User.findOne({ email }).select("+password"); 

    if(!user) return res.send('user not registered')

    const match = await bcrypt.compare(password, user.password)

    if(!match) return res.send('incorrect password')

    const token = jwt.sign({email: email}, process.env.JWT_SECRET,{expiresIn: '2h'})

    res.cookie("token", token)


    res.redirect('/profile')
}

exports.logout = async(req, res)=>{
    res.clearCookie("token");
    res.redirect('/login')
}

exports.profile = async(req, res)=>{
    const user =  await User.findOne({ email : req.user.email }).populate("posts");
    res.render("profile", { user: user });
}

exports.profileupload = async(req, res)=>{
    const user = await User.findOne({email: req.user.email})
    user.profilepic = req.file.filename
    await user.save()
    res.redirect("/profile")
}