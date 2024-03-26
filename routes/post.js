const express = require('express');

const routs = express.Router();
const PostModel = require('../models/PostModel');

const PostController = require('../controllers/PostController');

routs.get('/add_post', PostController.add_post);

routs.post("/insertPostData",PostModel.uploadImage,PostController.insertPostData);

module.exports = routs;