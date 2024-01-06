import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Content from "./components/Content/Content";
import MqttClient from "./services/mqttClient";
import { Detector } from "react-detect-offline";
import { useAppState } from "./store/appState";
function App() {
  MqttClient.getInstance();
  const setIsInternetAvailable = useAppState(
    (state) => state.setIsInternetAvailable
  );
  return (
    <Detector
      onChange={setIsInternetAvailable}
      render={() => (
        <>
          <Sidebar />
          <Content />
        </>
      )}
    />
  );
}

export default App;
