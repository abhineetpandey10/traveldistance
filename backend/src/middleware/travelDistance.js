const axios = require('axios');

/**
 * Middleware function to get the distance between two cities
 * Mapbox Directions Matrix API is used for finding the distance between the two cities
 * The distance that a person is likely to cover while driving is considered as the travel distance in this API
 * Axios is used for making requests to the Mapbox Directions Matrix API
 */

const getTravelDistance=(req,res,next)=>{
    
    //Coordinates (longitude, latitude) of the source and destination cities
    const coordinates=req.body.originCoordinates[0]+','+req.body.originCoordinates[1]+';'+req.body.destCoordinates[0]+','+req.body.destCoordinates[1];
    var config = {
        method: 'get',
        url: 'https://api.mapbox.com/directions-matrix/v1/mapbox/driving/'+coordinates+'?sources=1&annotations=distance,duration&access_token='+process.env.MAPBOX_ACCESS_TOKEN,
        headers: { }
    };
              
    axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
        
        var distanceInKm=response.data.distances[0][0]/1000;
        distanceInKm=distanceInKm.toFixed(2);   //the distance in km rounded off to 2 decimal places
        req.body.travelDistance=distanceInKm;

        next();
    })
    .catch(error=>{
        console.log(error);
        res.status(500).json({"Error: ":error.message});
    })
}

module.exports=getTravelDistance;