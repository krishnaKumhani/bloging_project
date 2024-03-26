const express = require('express');

const routs = express.Router();
const CommentModel = require('../models/CommentModel');

const userController = require('../controllers/UserController');

routs.get('/', userController.home);

routs.get("/blogSingle/:id", userController.blogSingle);

routs.post("/addComment",CommentModel.uploadImage, userController.addComment);

routs.get("/work-three-columns",userController.workThreeColumns);
module.exports = routs;