import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Content from "./components/Content/Content";
import MqttClient from "./services/mqttClient";
import { Detector } from "react-detect-offline";
import { HashRouter, Route, Routes } from "react-router-dom";
import LoginSuccess from "./components/OfflineStatus/LoginSuccess";
import Live from "./components/Live/Live";
import Devices from "./components/Devices/Devices";
import Test from "./components/Test/Test";
import PlayerManagement from "./components/PlayerManagement/PlayerManagement";
import SignUp from "./components/Profile/SignUp";
function App() {
  MqttClient.getInstance();
  return (
    <HashRouter>
      <Detector
        render={({ online }) => (
          <>
            <Sidebar isOnline={online} />
            <Routes>
              <Route path="/login/manager" element={<LoginSuccess />} />
              <Route path="/live" element={<Live />} />
              <Route path="/devices" element={<Devices />} />
              <Route path="/analytics" element={<Test />} />
              <Route path="/player-management" element={<PlayerManagement />} />
              <Route path="/profile" element={<SignUp />} />
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
