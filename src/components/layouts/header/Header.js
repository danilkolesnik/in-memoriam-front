import React from 'react'
import styles from "./header.module.scss";
import logo from "../../../assets/icons/logo.svg";
import settings from "../../../assets/icons/settings.svg";  

const Header = ({ profile, isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <header className={styles.headerWrapper}>
      <img className={styles.headerLogo} src={logo} alt="" />
      {profile && <img className={styles.settingsIcon} src={settings} alt="" onClick={() => setIsSidebarOpen(!isSidebarOpen)}/>}
    </header>
  );
}

export default Header