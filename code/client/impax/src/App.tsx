import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import MqttClient from "./services/mqttClient";
import { Detector } from "react-detect-offline";
import { HashRouter, Route, Routes } from "react-router-dom";
import Live from "./components/Live/Live";
import Devices from "./components/Devices/Devices";
import Test from "./components/Test/Test";
import PlayerManagement from "./components/PlayerManagement/PlayerManagement";
import SignUp from "./components/Profile/SignUp";
import TeamCreation from "./components/Profile/TeamCreation";
import Success from "./components/StatusScreens/Success";

async function getPorts() {}

function App() {
  MqttClient.getInstance();

  return (
    <HashRouter>
      <Detector
        render={({ online }) => (
          <>
            <Sidebar isOnline={online} />
            <Routes>
              <Route path="/" element={<SignUp />} />
              <Route
                path="login/manager"
                element={<Success title="Login" description="LORUM IPSUM" />}
              />
              <Route path="/live" Component={Live} />
              <Route path="devices" element={<Devices />} />
              <Route path="analytics" element={<Test />} />
              <Route path="player-management" element={<PlayerManagement />} />
              <Route path="profile" element={<SignUp />} />
              <Route path="/signup/manager" element={<TeamCreation />} />
              <Route
                path="/signup/manager/success"
                element={<Success title="Signup" description="LORUM IPSUM" />}
              />
            </Routes>
            {/* <Content isOnline={online} /> */}
          </>
        )}
      />
    </HashRouter>
  );
}

export default App;
