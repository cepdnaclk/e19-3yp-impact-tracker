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
import TeamExists from "./components/StatusScreens/TeamExists";
import { useSignupState } from "./states/formState";
import Profile from "./components/Profile/Profile";
import routes from "./routes/routeConfig";
function App() {
  MqttClient.getInstance();
  const isLoggedIn = useSignupState((state) => state.isLoggedIn);

  return (
    <HashRouter>
      <Detector
        render={({ online }) => (
          <>
            <Sidebar isOnline={online} />
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
        )}
      />
    </HashRouter>
  );
}

export default App;
