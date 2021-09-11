const axios = require('axios');

/**
 * Middleware function to get a list of names of cities/locations similar to the user input
 * Nominatim-a geocoding software used by OpenStreetMaps is used for fetching this data
 * Axios is used for making requests to the Nominatim API
 */

const getCityNames=(req,res,next)=>{
    var city=req.query.name;

    var config = {
        method: 'get',
        url: 'https://nominatim.openstreetmap.org/search?q='+city+'&format=json',
        headers: { }
    };
      
    axios(config)
    .then(function (response) {
        const locationsArray=[];

        response.data.forEach(element => {
            if(element.type==='city' || element.type==='administrative')
                locationsArray.push(element.display_name);
        });

        console.log(locationsArray);

        req.body.locations=locationsArray;

        next();
    })
    .catch(function (error) {
        console.log(error);
    });
}

module.exports=getCityNames;