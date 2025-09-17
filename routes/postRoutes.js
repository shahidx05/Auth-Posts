const express = require("express");
const { createpost, editpost, deletepost} = require("../controllers/postController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/create",authMiddleware, createpost);
router.post("/edit/:id", authMiddleware,editpost);
router.get("/delete/:id", authMiddleware, deletepost);

module.exports = router;