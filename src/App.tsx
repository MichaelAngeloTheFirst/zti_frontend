import { useEffect, useState } from "react";
import Map from "./components/Map";
import InputPin from "./components/InputPin";


type Pin = {
  position: [number, number];
  text: string;
};

function App() {
  const pinsTable: Pin[] = [
    { position: [52.06, 19.25], text: "Poznań" },
    { position: [51.11, 17.03], text: "Wrocław" },
    { position: [52.13, 21.00], text: "Warszawa" },
  ];
  // usestate with pins
  const [Pins, setPins] = useState<Pin[]>(pinsTable);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setPins((prev) => {
  //       return prev.map((pin) => {
  //         return {
  //           position: [pin.position[0] + 0.1, pin.position[1] + 0.1],
  //           text: pin.text,
  //         };
  //       });
  //     });
  //   }, 1000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [] )


  return (
    <div className="bg-red-600">
      <h1>React Leaflet</h1>
      <Map pins={Pins}/>
      <InputPin pins={Pins} setPins={setPins}/>
    </div>
  );
}

export default App;
