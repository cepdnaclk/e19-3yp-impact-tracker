import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Content from "./components/Content/Content";
import MqttClient from "./services/mqttClient";

function App() {
  MqttClient.getInstance();
  return (
    <>
      <Sidebar />
      <Content />
    </>
  );
}

export default App;
