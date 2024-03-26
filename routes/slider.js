const express = require('express');

const routs = express.Router();
const SliderModel = require('../models/SliderModel');

const SliderController = require('../controllers/SliderController');

routs.get("/add_slider",SliderController.add_slider);

routs.post("/insertSliderData",SliderModel.uploadImage,SliderController.insertSliderData);

routs.get("/view_slider",SliderController.view_slider);

routs.get("/deactive/:id", SliderController.deactive);
routs.get("/active/:id", SliderController.active);

module.exports = routs;