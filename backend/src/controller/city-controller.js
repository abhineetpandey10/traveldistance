/**
 * @queryParam {city} - The city/location similar to which a list of city/location names would be returned
*/

const findCityNames=(req,res)=>
{
    res.json({"locations":req.body.locations});
}

module.exports=findCityNames;