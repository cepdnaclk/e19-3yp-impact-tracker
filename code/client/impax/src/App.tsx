import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Live from "./components/Live/Live";
function App() {
  type selectedPage = "live" | "devices" | "analytics" | "profile";

  return (
    <>
      <Sidebar />
      <Live />
    </>
  );
}

export default App;
