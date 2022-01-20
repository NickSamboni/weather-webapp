import React from 'react';
import axios from 'axios';

/*const states = [ "AL", "AK", "AS", "AR", "AZ", "CO",
  "CT", "DE", "DC", "FL", "GA", "GU", "HI", "ID", "IL", "IN", "IA",
  "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT",
  "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR",
  "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VI", "VA",
  "WA", "WV", "WI", "WY"];*/
const states = ["AL"];
var stations_log = [];

const cors_domain = 'https://the-ultimate-api-challenge.herokuapp.com';
const baseIPA = 'https://api.weather.gov/stations?state=';
const request_url = `${cors_domain}/${baseIPA}`;
const latest_obs1 = 'https://api.weather.gov/stations/';
const latest_obs2 = '/observations/latest';

function App(){

    const getAPI = () => {
      for (const x in states){
        axios.get(`${request_url}`+states[x]).then(
          (Response)=>{
            for (const y in Response.data.features){
              const stations_id = Response.data.features[y].id;
              const stations = stations_id.substring(33,40);
              const latest = stations;
              const last_obs_stat = latest_obs1+latest+latest_obs2;
              //console.log(last_obs_stat);
              setTimeout(() => {
                console.log('axios request')
              }, 3000)
              axios.get((`${cors_domain}/${last_obs_stat}`)).then(
                (Response)=>{
                  if (Response.status === 200){
                    stations_log.push(Response)
                    console.log(Response)
                  }else{;}
                });
              }
          }
        );
      }
    }

    return (
    
      <div>App api<button onClick={getAPI}>API data</button></div>
       
    )
}

export default App