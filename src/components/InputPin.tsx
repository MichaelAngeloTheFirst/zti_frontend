import { useAuth } from "oidc-react";

export default function InputPin() {
  const creator_uid = useAuth().userData?.profile.sub;

  const handleAddPin = () => {
    console.log(creator_uid);
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
