const axios = require('axios');

/**
 * Middleware function to get the coordinates of the destination city
 * Nominatim-a geocoding software used by OpenStreetMaps is used for fetching this data
 * Axios is used for making requests to the Nominatim API
 */

const getDestCoordinates=(req,res,next)=>{
    //Name of the destination city
    var destination=req.query.destination;
    
    var config={
        method:'get',
        url: 'https://nominatim.openstreetmap.org/search?q='+destination+'&format=json',
        headers:{}
    }

    axios(config)
    .then(response=>{
        let longitude=(response.data[0]).lon;
        let latitude=(response.data[0]).lat;

        console.log("Destination: "+longitude+", "+latitude);

        req.body.destCoordinates=[longitude,latitude];
        
        next();
    })
    .catch(error=>{
        console.log(error);
        res.status(500).json({"Error: ":error.message});
    })
}

module.exports=getDestCoordinates;