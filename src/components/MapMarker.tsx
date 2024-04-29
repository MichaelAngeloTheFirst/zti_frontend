import { Marker, Popup } from "react-leaflet";

export default function MapMarker({
  position,
  text,
}: {
  position: [number, number];
  text: string;
}) {
  return (
    <Marker position={position}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
        , {text}
      </Popup>
    </Marker>
  );
}
