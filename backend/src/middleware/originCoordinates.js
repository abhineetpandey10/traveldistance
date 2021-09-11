const axios = require('axios');

/**
 * Middleware function to get the coordinates of the origin city
 * Nominatim-a geocoding software used by OpenStreetMaps is used for fetching this data
 * Axios is used for making requests to the Nominatim API
 */

const getOriginCoordinates=(req,res,next)=>{
    //Name of the origin city
    var origin=req.query.origin;
    
    var config={
        method:'get',
        url: 'https://nominatim.openstreetmap.org/search?q='+origin+'&format=json',
        headers:{}
    }

    axios(config)
    .then(response=>{
        let longitude=(response.data[0]).lon;
        let latitude=(response.data[0]).lat;

        console.log("Origin: "+longitude+", "+latitude);

        req.body.originCoordinates=[longitude,latitude];
        
        next();
    })
    .catch(error=>{
        console.log(error);
        res.status(500).json({"Error: ":error.message});
    })
}

module.exports=getOriginCoordinates