import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Content from "./components/Content/Content";
import { useStartMqttClient } from "./services/mqttClient";

function App() {
  useStartMqttClient();
  return (
    <>
      <Sidebar />
      <Content />
    </>
  );
}

export default App;
