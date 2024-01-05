import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Content from "./components/Content/Content";
import { useStartMqttClient } from "./services/mqttClient";
import { Detector } from "react-detect-offline";
import { useAppState } from "./store/appState";
function App() {
  useStartMqttClient();
  const setIsInternetAvailable = useAppState(
    (state) => state.setIsInternetAvailable
  );
  return (
    <>
      <Detector
        onChange={setIsInternetAvailable}
        render={() => (
          <>
            <Sidebar />
            <Content />
          </>
        )}
      />
      {/* <Sidebar /> */}
      {/* <Content /> */}
    </>
  );
}

export default App;
