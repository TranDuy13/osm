import logo from "./logo.svg";
import "./App.css";
import mapboxgl from "mapbox-gl";
import { useRef } from "react";
import { useEffect } from "react";
import data from "./data.js"
function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  mapboxgl.accessToken =
    "pk.eyJ1IjoiZmFrZXVzZXJnaXRodWIiLCJhIjoiY2pwOGlneGI4MDNnaDN1c2J0eW5zb2ZiNyJ9.mALv0tCpbYUPtzT7YysA2g";
  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current, // container ID
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: "mapbox://styles/mapbox/streets-v12", // style URL
      center:  [108.900802611, 12.092131615], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
    map.current.on("load", () => {
      map.current.addSource("rwanda-province", 
      {
        type: "geojson",
        data: data
      });
      map.current.addLayer(
        {
          id: "Khanhhoa-provinces",
          type: "fill",
          source: "rwanda-province",
          layout: {},
          paint: {
            'fill-color': [
              'interpolate',
              ['linear'],
              ['get', 'population'],
              0,
              '#F2F12D',
              500000,
              '#EED322',
              750000,
              '#E6B71E',
              1000000,
              '#DA9C20',
              2500000,
              '#CA8323',
              5000000,
              '#B86B25',
              7500000,
              '#A25626',
              10000000,
              '#8B4225',
              25000000,
              '#723122'
              ],
              'fill-opacity': 0.75
          },
        },
        "road-label" // Place polygons under labels
      );
      map.current.addLayer({
        id: "Khanhhoa-provinces12",
        type: "line",
        source: "rwanda-province",
        layout: {},
        paint: {
        'line-color': '#f7f7f7',
        'line-width': 2
        }
        });
    });
  });
  // const map = new mapboxgl.Map({
  //   container: "map", // container ID
  //   // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  //   style: "mapbox://styles/mapbox/streets-v12", // style URL
  //   center: [30.0222, -1.9596], // starting position [lng, lat]
  //   zoom: 7, // starting zoom
  // });

  return (
    <div>
      <div ref={mapContainer} style={{ height: "800px" }} />
    </div>
  );
}

export default App;
