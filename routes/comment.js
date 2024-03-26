const express = require('express');

const routs = express.Router();

const CommentController = require('../controllers/CommentController');


routs.get("/view_comments", CommentController.view_comments);


module.exports = routs;