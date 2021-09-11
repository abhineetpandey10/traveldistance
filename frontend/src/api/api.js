export async function fetchSimilarLocations(val)
{
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    let url="https://traveldistance.herokuapp.com/cities?name="+val;
    
    let listOfLocations='';
    try
    {
        let response=await fetch(url, requestOptions)
        response=response.text();
        listOfLocations=response;

        return listOfLocations;
    }
    catch(error)
    {
        console.log(error.message);
        return "An error occured";
    }
}

export async function fetchTravelDistance(location1,location2)
{
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    
    let url="https://traveldistance.herokuapp.com/distance?origin="+location1+"&destination="+location2;

    let travelDistance='0';
    try
    {
        let response = await fetch(url, requestOptions);
        response=response.text();
        travelDistance=response;

        return travelDistance;
    }
    catch(error)
    {
        console.log(error.message);
        return "An error occured";
    }
    return await 
        fetch(url, requestOptions)
        .then(response => response.text())
        .catch(error => console.log('error', error)
    )
}