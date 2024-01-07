import styles from "./Sidebar.module.scss";
import { BsBroadcast } from "react-icons/bs";
import { FaRegUserCircle, FaUsers } from "react-icons/fa";
import { MdDeviceHub, MdBarChart } from "react-icons/md";
import MenuItem from "./MenuItem";
import { useAppState } from "../../states/appState";
import { HashRouter, Route, Routes, useNavigate } from "react-router-dom";
interface Props {
  isOnline: boolean;
}

const Sidebar: React.FC<Props> = () => {
  const activePage = useAppState((state) => state.activePage);
  const setActivePage = useAppState((state) => state.setActivePage);
  const navigate = useNavigate();

  return (
    <aside className={styles.sideBar}>
      <nav className={styles.menu}>
        <MenuItem
          icon={BsBroadcast}
          name="Live"
          active={activePage === "live"}
          onClick={() => {
            setActivePage("live");
            navigate("/live");
          }}
        />
        <MenuItem
          icon={MdDeviceHub}
          name="Buddy Connectivity"
          active={activePage === "devices"}
          onClick={() => {
            setActivePage("devices");
            navigate("/devices");
          }}
        />
        <MenuItem
          icon={MdBarChart}
          name="Analytics"
          active={activePage === "analytics"}
          onClick={() => {
            setActivePage("analytics");
            navigate("/analytics");
          }}
        />
        <MenuItem
          icon={FaUsers}
          name="Player Management"
          active={activePage === "player-management"}
          onClick={() => {
            setActivePage("player-management");
            navigate("/player-management");
          }}
        />
      </nav>

      <MenuItem
        icon={FaRegUserCircle}
        name="Profile"
        active={activePage === "profile"}
        onClick={() => {
          setActivePage("profile");
          navigate("/profile");
        }}
      />
    </aside>
  );
};

export default Sidebar;
