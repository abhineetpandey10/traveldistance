const express=require('express');
const router=express.Router();

/**
 * Express router for the route pertaining to the GET request for finding the distance between two cities
 */

const originCoordinates=require('../middleware/originCoordinates');
const destCoordinates=require('../middleware/destCoordinates');
const travelDistance=require('../middleware/travelDistance');

const findTravelDistance=require('../controller/distance-controller');

router.get("/",[originCoordinates,destCoordinates,travelDistance],findTravelDistance);

module.exports=router;