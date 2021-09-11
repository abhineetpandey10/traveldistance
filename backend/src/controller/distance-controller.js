require('dotenv').config();

/**
 * @queryParam {origin} - The origin city/location where the travel starts 
 * @queryParam {destination} - The destination city/location where the travel ends
*/

const findTravelDistance=(req,res)=>{
    res.json({travelDistance:req.body.travelDistance});
}

module.exports=findTravelDistance;