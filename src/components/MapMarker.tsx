import { Marker, Popup } from "react-leaflet";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function MapMarker({ pin, pinId }: { pin: Pin; pinId: number }) {
  // const { removePin } = usePinStore();

  const removeMarker = (pin: Pin) => {
    console.log("Removing marker", pin);
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
            <Button variant="destructive" className="hover:bg-red-700 ">
              Remove
            </Button>
          </p>
        </Card>
      </Popup>
    </Marker>
  );
}
