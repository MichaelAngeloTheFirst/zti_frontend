import { Marker, Popup } from "react-leaflet";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAxiosClient } from "@/lib/api.ts";
import { deletePinUrl } from "@/lib/urls";
import { useContext } from "react";
import { pinContext } from "@/lib/pinContext";

export default function MapMarker({ pin, pinId }: { pin: Pin; pinId: number }) {
  // const { removePin } = usePinStore();
  const client = useAxiosClient();
  const store = useContext(pinContext);

  const removeMarker = (pin: Pin) => {
    console.log("Removing marker", pin);
    const pins = store?.getState().pins;

    client
      .delete(deletePinUrl(pin.pinId))
      .then(() => {
        const updatedPins = pins?.filter((p) => p.pinId !== pin.pinId);
        store?.getState().setPins(updatedPins || []);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  return (
    <Marker
      key={pinId}
      position={[pin.latitude, pin.longitude]}
      draggable={false}
    >
      <Popup>
        <Card className="pl-0">
          <CardHeader className="flex justify-start pl-0 pt-0">
            <CardTitle>{pin.pinText}</CardTitle>
            <CardDescription>{pin.category}</CardDescription>
          </CardHeader>

          <p className="flex justify-end pr-2 pb-0 .my-0">
            <Button
              variant="destructive"
              className="hover:bg-red-700 "
              onClick={() => removeMarker(pin)}
            >
              Remove
            </Button>
          </p>
        </Card>
      </Popup>
    </Marker>
  );
}
