import Map from "./components/Map";
import { pinContext } from "./lib/pinContext";
import { useEffect, useRef } from "react";
import { usePinStore } from "./stores/pinStore";
import { useAxiosClient } from "./lib/api";
import { getPinUrl } from "./lib/urls";
import { useAuth } from "oidc-react";

function App() {
  const client = useAxiosClient();
  const getState = async () => {
    const response = await client.get(getPinUrl());
    return response.data;
  };
  const { userData } = useAuth();
  useEffect(() => {
    if (userData) {
      getState().then((data) => console.log(data));
    }
  }, [userData]);

  // const store = useRef(usePinStore(await getState())).current;

  return (
    <div className="bg-red-600">
      <h1>React Leaflet</h1>
      <div className="flex h-7">
        {/* <pinContext.Provider value={store}>
          <Map />
        </pinContext.Provider> */}
      </div>
    </div>
  );
}

export default App;
