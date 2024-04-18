import { MapContainer, TileLayer } from "react-leaflet";
import "../App.css";

export default function Map() {
  return (
    <div className="w-full bg-blue-gray-50 ">
      <h1>React Leaflet</h1>
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
      <div> end </div>
    </div>
  );
}
