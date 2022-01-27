import React, {useState, useRef} from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import useSwr from 'swr';
import useSuperCluster from 'use-supercluster';
import Footer from '../components/Footer';
import './maps.css'

const fetcher = (...args) => fetch(...args).then(response => response.json());

export default function App(){

  const [viewport, setViewport] = useState({
      latitude: 39.50,
      longitude: -98.35,
      width: "100vw",
      height: "80vh",
      zoom: 4,
      align: "center"
  });

  const [selectedStat, setSelectedStat] = useState(null)
  const mapRef = useRef();

  const url = 'http://localhost:4000/api'
  const {data,error} = useSwr(url, fetcher)
  const stat = data && !error ? data : [];

  const points = stat.map(stat => ({
      type: 'Feature',
      properties: {
          statID: stat._id,
          Elevation: stat.Elevation,
          Temperature: stat.temperature,
          windDirection: stat.windDirection,
          windSpeed: stat.windSpeed,
          seaLevelPressure: stat.seaLevelPressure,
          visibility: stat.visibility,
          humidity: stat.humidity,
      }, 
      geometry: {
          type: 'Point',
          coordinates: [
              stat.geometry.coordinates[0],
              stat.geometry.coordinates[1]
          ]
      }
  }));
  console.log(stat)
  
  const bounds = mapRef.current ? mapRef.current.getMap().getBounds().toArray().flat() : null;

  const {clusters} = useSuperCluster({
      points,
      bounds,
      zoom: viewport.zoom,
      options: { radius:75, maxZoom: 20}
  });
  console.log(clusters)
  return (
    <div className='conjunto'>
    <div className='container-1'>  
              <ReactMapGL
                  {...viewport}
                  maxZoom={20}
                  mapboxApiAccessToken={"pk.eyJ1Ijoibmlja3JhbW9zIiwiYSI6ImNraDV5aWEyczA1Z2wyeG81aWF5aXZsMmEifQ.U7abGA4WpCo3OMj3h4lCjw"}
                  mapStyle={"mapbox://styles/nickramos/ckyq81p433e6c15mwx77u8aqp"}
                  onViewportChange={viewport => {
                      setViewport(viewport);
                  }}
                  ref={mapRef}>

                  {clusters.map(cluster => {
                      const [longitude, latitude] = cluster.geometry.coordinates;
                      const {
                          cluster: isCluster,
                          point_count: pointCount,
                        } = cluster.properties;
                      if (isCluster) {
                          <Marker
                          key={cluster.id}
                          latitude={latitude} 
                          longitude={longitude}
                          >
                          <div className="cluster-marker">{pointCount}</div>
                          </Marker>
                      }

                      return (
                          <Marker
                          key={cluster.properties.statID}
                          latitude={latitude} 
                          longitude={longitude}
                          >
                          <button className="station-marker">
                              <img src="./images/Logo24-01.png" alt="si no hay F"/>
                          </button>
                          </Marker>
                      )
                  })}
              </ReactMapGL>
              </div>
      <Footer />
      </div>
  )
}
