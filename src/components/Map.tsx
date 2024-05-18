import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import MapMarker from "./MapMarker.tsx";
import { useEffect, useState } from "react";
import { useCreatorStore } from "../stores/creatorStore.ts";
import { useContext } from "react";
import { pinContext } from "../lib/pinContext.tsx";
import { useStore } from "zustand";

export default function Map() {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [pinText, setPinText] = useState("");
  const { creator, setCreator } = useCreatorStore();
  const store = useContext(pinContext);
  if (!store) throw new Error("Missing pinContext.Provider in the tree");
  const pins = useStore(store, (state) => state.pins);
  const setPins = useStore(store, (state) => state.setPins);

  // useEffect(() => {
  //   fetchPins();
  // }, []);

  useEffect(() => {
    console.log("Creator: ", creator);
  }, [creator]);

  function MapFunctions() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const map = useMapEvents({
      dblclick: (event) => {
        const { lat, lng } = event.latlng;
        setCreator(true);
        setPosition([lat, lng]);
      },
    });
    return null;
  }

  const handlePinCreate = () => {
    if (position) {
      // Here you can add logic to save the pin data or perform other actions
      console.log("Pin text:", pinText);
      console.log("Position:", position);
      // Reset state
      setPosition(null);
      setPinText("");
      setCreator(false);
    }
  };

  return (
    <div className="w-full bg-blue-gray-50 ">
      <h1>React Leaflet</h1>
      <MapContainer
        className="flex"
        style={{ height: 800, width: 800 }}
        center={[52.06, 19.25]}
        zoom={6}
        scrollWheelZoom={true}
        doubleClickZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {pins?.map((pin) => (
          <MapMarker pin={pin} />
        ))}
        <MapFunctions />
      </MapContainer>
      {creator && (
        <div>
          <h2>Create Pin</h2>
          <input
            type="text"
            value={pinText}
            onChange={(e) => setPinText(e.target.value)}
            placeholder="Enter Pin Text"
          />
          <button onClick={handlePinCreate}>Create Pin</button>
        </div>
      )}
      <div> end </div>
    </div>
  );
}
