import { MapContainer, TileLayer } from "react-leaflet";
import  MapMarker from "./MapMarker.tsx";


type Pin = {
  position: [number, number];
  text: string;
};


export default function Map({ pins}: { pins: Pin[] }) {
  


  return (
    <div className="w-full bg-blue-gray-50 ">
      <h1>React Leaflet</h1>
      <MapContainer center={[52.06, 19.25]} zoom={6} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        if (pins) {
          pins.map((pin) => (  
            <MapMarker position={pin.position} text={pin.text} />
          ))
        }
        {/* {pins.map((pin) => (  
          <MapMarker position={pin.position} text={pin.text} />
        ))
        } */}
        <MapMarker position={[52.06, 19.25]} text="Poznań" />
      </MapContainer>
      <div> end </div>
    </div>
  );
}
