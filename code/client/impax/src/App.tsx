import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import MqttClient from "./services/mqttClient";
import { Detector } from "react-detect-offline";
import { HashRouter, Route, Routes } from "react-router-dom";
import routes from "./routes/routeConfig";
import { useAppState } from "./states/appState";
import { getPlayers, uploadSession } from "./services/httpClient";

function App() {
  MqttClient.getInstance();
  const setIsInternetAvailable = useAppState(
    (state) => state.setIsInternetAvailable
  );
  return (
    <HashRouter>
      <Detector
        render={({ online }) => {
          if (online) {
            uploadSession();
            getPlayers();
            console.log("Back Online...");
          }
          setIsInternetAvailable(online);
          return (
            <>
              <Sidebar />
              <Routes>
                {routes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      route.props ? (
                        <route.component {...route.props} />
                      ) : (
                        <route.component />
                      )
                    }
                  />
                ))}
              </Routes>
            </>
          );
        }}
      />
    </HashRouter>
  );
}

export default App;
