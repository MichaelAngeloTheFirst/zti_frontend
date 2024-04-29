import { useState } from "react";



type Pin = {
    position: [number, number];
    text: string;
};



export default function InputPin({ pins, setPins }: { pins: Pin[]; setPins: React.Dispatch<React.SetStateAction<Pin[]>> }) {
  const [position, setPosition] = useState<[number, number]>([0, 0]);
  const [text, setText] = useState<string>("");

  const handleAddPin = () => {
    setPins((prev) => {
      return [...prev, { position, text }];
    });
    console.log(pins);
  };

  return (
    <div className="bg-blue-gray-50">
      <h1>Input Pin</h1>
      <input
        type="text"
        placeholder="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        type="number"
        placeholder="latitude"
        value={position[0]}
        onChange={(e) => setPosition([+e.target.value, position[1]])}
      />
      <input
        type="number"
        placeholder="longitude"
        value={position[1]}
        onChange={(e) => setPosition([position[0], +e.target.value])}
      />
      <button onClick={handleAddPin}>Add Pin</button>
    </div>
  );
}