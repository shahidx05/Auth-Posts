const express = require('express')
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const User = require('./models/user')
const cookieParser = require("cookie-parser");

const app = express()
const port = 3000

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");


app.use('/', authRoutes);
app.use('/', postRoutes);
app.use('/', userRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
