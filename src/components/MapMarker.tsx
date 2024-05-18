import { Marker, Popup } from "react-leaflet";
// import { usePinStore } from "../stores/pinStore";

export default function MapMarker({ pin }: { pin: Pin }) {
  // const { removePin } = usePinStore();

  const removeMarker = (pin: Pin) => {
    console.log("Removing marker", pin);
  };

  return (
    <Marker key={pin.id} position={pin.position} draggable={true}>
      <Popup>
        {pin.text}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => removeMarker(pin)}
        >
          Remove marker
        </button>
      </Popup>
    </Marker>
  );
}
