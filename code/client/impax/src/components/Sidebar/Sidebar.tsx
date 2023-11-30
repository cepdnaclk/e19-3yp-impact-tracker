import React, { useState } from "react";
import styles from "./Sidebar.module.scss";
import { BsBroadcast } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { MdDeviceHub, MdBarChart } from "react-icons/md";
import MenuItem from "./MenuItem";
import { useAppState } from "../../store/appState";

const Sidebar = () => {
  // type activePage = "live" | "devices" | "analytics" | "profile";
  const activePage = useAppState((state) => state.activePage);
  const setActivePage = useAppState((state) => state.setActivePage);
  return (
    <aside className={styles.sideBar}>
      <nav className={styles.menu}>
        <MenuItem
          icon={BsBroadcast}
          name="Live"
          active={activePage === "live"}
          onClick={() => setActivePage("live")}
        />
        <MenuItem
          icon={MdDeviceHub}
          name="Device Connectivity"
          active={activePage === "devices"}
          onClick={() => setActivePage("devices")}
        />
        <MenuItem
          icon={MdBarChart}
          name="Analytics"
          active={activePage === "analytics"}
          onClick={() => setActivePage("analytics")}
        />
      </nav>

      <MenuItem
        icon={FaRegUserCircle}
        name="Profile"
        active={activePage === "profile"}
        onClick={() => setActivePage("profile")}
      />
    </aside>
  );
};

export default Sidebar;
