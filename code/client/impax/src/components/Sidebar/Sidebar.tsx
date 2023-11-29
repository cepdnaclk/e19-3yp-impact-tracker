import React from "react";
import styles from "./Sidebar.module.scss";
import { BsBroadcast } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { MdDeviceHub, MdBarChart } from "react-icons/md";
import MenuItem from "./MenuItem";
const Sidebar = () => {
  return (
    <aside className={styles.sideBar}>
      <nav className={styles.menu}>
        <MenuItem icon={BsBroadcast} name="Live" active />
        <MenuItem icon={MdDeviceHub} name="Device Connectivity" />
        <MenuItem icon={MdBarChart} name="Analytics" />
      </nav>

      <MenuItem icon={FaRegUserCircle} name="Profile" />
    </aside>
  );
};

export default Sidebar;
