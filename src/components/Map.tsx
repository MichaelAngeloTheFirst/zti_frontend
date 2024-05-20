import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import MapMarker from "./MapMarker.tsx";
import { useState } from "react";
import { useCreatorStore } from "../stores/creatorStore.ts";
import { useContext } from "react";
import { pinContext } from "../lib/pinContext.tsx";
import { useStore } from "zustand";
import { useAxiosClient } from "@/lib/api.ts";
import { useAtom } from "jotai";
import categoryAtom from "@/lib/categoryAtom.ts";
import * as React from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Checked = DropdownMenuCheckboxItemProps["checked"];

export default function Map() {
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(false);
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [pinText, setPinText] = useState("");
  const { creator, setCreator } = useCreatorStore();
  const store = useContext(pinContext);
  const client = useAxiosClient();
  const [categories] = useAtom(categoryAtom);
  if (!store) throw new Error("Missing pinContext.Provider in the tree");
  const pins = useStore(store, (state) => state.pins);
  console.log("Pins: ", pins);

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
      console.log("Pin text:", pinText);
      console.log("Position:", position);
      const params = {
        pinText,
        latitude: position[0],
        longitude: position[1],
      };

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
          <li key={pin.pinId}>
            <MapMarker pinId={pin.pinId} pin={pin} />
          </li>
        ))}
        <MapFunctions />
      </MapContainer>
      {creator && (
        <div>
          <h2>Create Pin</h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Open</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Available categories</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {categories.map((category) => (
                <DropdownMenuCheckboxItem
                  checked={showStatusBar}
                  onCheckedChange={setShowStatusBar}
                >
                  {category}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
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
