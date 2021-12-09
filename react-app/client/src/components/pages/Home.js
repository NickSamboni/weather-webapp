import React from 'react';
import axios from 'axios';

function App(){

    const getAPI = () => {
        axios.get('https://api.weather.gov/stations/SURF1/observations/latest').then(
          (Response)=>{
            console.log(Response.data.properties);
          }
        );
    }

    return (
    
      <div>App api<button onClick={getAPI}>API data</button></div>
       
    )
}

export default App