const express=require('express');
const router=express.Router();
const cityNames=require('../middleware/cityNames');
const findCityNames=require('../controller/city-controller');

/**
 * Express router for the route pertaining to the GET request for finding city/location names similar to the user input
 */

router.get("/",cityNames,findCityNames);

module.exports=router;