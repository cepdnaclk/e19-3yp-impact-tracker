import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Content from "./components/Content/Content";
import MqttClient from "./services/mqttClient";
import { Detector } from "react-detect-offline";
function App() {
  MqttClient.getInstance();
  return (
    <Detector
      render={({ online }) => (
        <>
          <Sidebar />
          <Content isOnline={online} />
        </>
      )}
    />
  );
}

export default App;
