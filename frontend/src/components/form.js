import '../css/form.css';
import { useEffect, useState } from 'react';
import Button from './button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { fetchSimilarLocations,fetchTravelDistance } from '../api/api';

const Form=()=>{

    const [city1,setCity1]=useState('');  
    const [city2,setCity2]=useState('');

    const [city1Locations,setCity1Locations]=useState([]);  //list of locations similar to city1
    const [city2Locations,setCity2Locations]=useState([]);  //list of locations similar to city2

    const [city1OptionsDisplay,setCity1OptionsDisplay]=useState('none');    //to display/hide list of locations similar to city1
    const [city2OptionsDisplay,setCity2OptionsDisplay]=useState('none');    //to display/hide list of locations similar to city2

    const [message,setMessage]=useState(' ');   //message shown to user in case of an error
    const [result,setResult]=useState('0');     //distance between the two cities/locations in KM

    const [resultVisible,setResultVisible]=useState('hidden');  //to display/hide the result
    const [loading,setLoading]=useState('none');                //to display/hide the Circular Progress indicator

    /**
     * Asynchronous function to update the list of locations similar to city1 or city2
     * @param {Integer} index - indicates which list of locations has to be updated
     * @param {String}  value - indicates the name of city/location similar to which the list of locations has to be fetched
     */
    async function updateCityLocations(index,value)
    {
        if(index===1)
        {
            setCity1(value);
            if(value.length>=3)
            {
                let city1Loc=JSON.parse(await fetchSimilarLocations(city1));
                setCity1Locations(city1Loc.locations);
                setCity1OptionsDisplay('block');
            }
            else
            {
                setCity1OptionsDisplay('none');
            }
        }
        else if(index===2)
        {
            setCity2(value);
            if(value.length>=3)
            {
                let city2Loc=JSON.parse(await fetchSimilarLocations(city2));
                setCity2Locations(city2Loc.locations);
                setCity2OptionsDisplay('block');
            }
            else
            {
                setCity2OptionsDisplay('none');
            }
        }
    }

    /**
     * Asynchronous function to set the input value of city 1 or city 2 based on the users choice from the list of locations displayed to him/her 
     * @param {Integer} index - indicates which text input field's value has to be set, that of city 1 or that of city 2
     * @param {String}  val - indicates the value which has to be set for the respective text input field
     */

    function setCityInput(index,val)
    {
        if(index===1)
        {
            setCity1OptionsDisplay('none');
            document.getElementById("city1").value=val;
            setCity1(val);
        }
        else if(index===2)
        {
            setCity2OptionsDisplay('none');
            document.getElementById("city2").value=val;
            setCity2(val);
        }
    }

    /**
     * Asynchronous function to find the travel distance between city1 and city2
     */
    async function findResult()
    {
        console.log("Finding result...");
        if(city1.length===0 || city2.length===0)
            setMessage("*Please Fill in all the required details");
        else
        {
            setLoading('block');
            let dist=JSON.parse(await fetchTravelDistance(city1,city2));
            setMessage(' ');
            setResult(dist.travelDistance);
            setResultVisible('visible');
            setLoading('none');
        }
    }

    useEffect(()=>{
        if(result==='0') setResultVisible('hidden');
    })

    return(
        <div className="form-container">
            <div className="form">
                <div className="form-detail">
                    <div className="label">
                        <label for="city1">City 1:</label>
                    </div>
                    <div className="form-input">
                        <input type="text" id="city1" placeholder="Type the name of a city/location" onChange={(event)=>updateCityLocations(1,event.target.value)}/>
                    </div>
                    <div className="city1Options" style={{display:city1OptionsDisplay}}>
                        {
                            city1Locations.map((item)=>{
                                return <p key={item} className="option" onClick={()=>setCityInput(1,item)}>{item}</p>
                            })
                        }
                    </div>
                </div>
                <div className="form-detail">
                    <div className="label">
                        <label for="city2">City 2:</label>
                    </div>
                    <div className="form-input">
                        <input type="text" id="city2" placeholder="Type the name of a city/location" onChange={(event)=>updateCityLocations(2,event.target.value)}/>
                    </div>
                    <div className="city2Options" style={{display:city2OptionsDisplay}}>
                        {
                            city2Locations.map((item)=>{
                                return <p key={item} className="option" onClick={()=>setCityInput(2,item)}>{item}</p>
                            })
                        }
                    </div>
                </div>
                <div onClick={()=>findResult()} className="form-detail">
                    <Button value="Find Travel Distance"/>
                </div>
                <div style={{color:"red",marginBottom:'20px'}}>{message}</div>
                <CircularProgress style={{fontSize:'large',color:'#5f7587',display:loading}}/>
                <div className="result" style={{visibility:resultVisible}}>
                    <span id="etd" className="label">Estimated Travel Distance: </span>
                    <span id="etd-val">{result} km</span>
                </div>
            </div>
        </div>
    )
}

export default Form;