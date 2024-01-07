import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Content from "./components/Content/Content";
import MqttClient from "./services/mqttClient";
import { Detector } from "react-detect-offline";
import { HashRouter, Route, Routes } from "react-router-dom";
import LoginSuccess from "./components/OfflineStatus/LoginSuccess";
import Live from "./components/Live/Live";
function App() {
  MqttClient.getInstance();
  return (
    <HashRouter>
      <Detector
        render={({ online }) => (
          <>
            <Sidebar />
            <Routes>
              <Route path="/login/manager" element={<LoginSuccess />} />
              <Route path="/live" element={<Live />} />
            </Routes>
            {/* <Content isOnline={online} /> */}
          </>
        )}
      />
      <Routes>
        <Route path="/login/manager" element={<LoginSuccess />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
