import { Marker, Popup } from "react-leaflet";

export default function MapMarker({
  position,
  text,
}: {
  position: [number, number];
  text: string;
}) {
  const removeMarker = (position: [number, number]) => {
    console.log("remove marker", position);
  };

  return (
    <Marker position={position} draggable={true}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable. , {text}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => removeMarker(position)}
        >
          Remove marker
        </button>
      </Popup>
    </Marker>
  );
}
