// import "./App.css";
// import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import { LatLngTuple } from "leaflet";
// import "leaflet/dist/leaflet.css";
// import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
// import "leaflet-defaulticon-compatibility";
import Map from "./components/Map";
// const position: LatLngTuple = [51.505, -0.09];
import { Button } from "@material-tailwind/react";

function App() {
  return (
    <div>
      <h1>React Leaflet</h1>
      <Button>Button</Button>
      <Map />
    </div>
  );
}

export default App;
