import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Live from "./components/Live/Live";
import Test from "./components/Test/Test";
import Content from "./components/Content/Content";

function App() {
  // type selectedPage = "live" | "devices" | "analytics" | "profile";

  return (
    <>
      <Sidebar />
      <Content />
      {/* <Live /> */}

      {/* <Test /> */}
    </>
  );
}

export default App;
