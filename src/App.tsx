import Map from "./components/Map";
import { pinContext } from "./lib/pinContext";
import { useEffect, useRef } from "react";
import { usePinStore } from "./stores/pinStore";
import { useAxiosClient } from "./lib/api";
import { getCreatorPinUrl } from "./lib/urls";
import { useAuth } from "oidc-react";
import "./globals.css";

function App() {
  const client = useAxiosClient();
  const store = useRef(usePinStore()).current;
  const { userData } = useAuth();

  useEffect(() => {
    if (userData) {
      const getState = async () => {
        const response = await client.get(
          getCreatorPinUrl(userData.profile.sub)
        );
        return response.data;
      };
      getState().then((data) => {
        store.getState().setPins(data);
      });
    }
  }, [client, store, userData]);

  return (
    <div className="w-full h-full">
      <div className="flex w-full h-full">
        <pinContext.Provider value={store}>
          <Map />
        </pinContext.Provider>
      </div>
    </div>
  );
}

export default App;
