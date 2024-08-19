import React from 'react';
import { useNavigate } from "react-router-dom";
import styles from "./header.module.scss";
import logo from "../../../assets/icons/logo.svg";
import settings from "../../../assets/icons/settings.svg";  
import returnBack from "../../../assets/icons/return.svg";

const Header = ({ profile, feed, isSidebarOpen, setIsSidebarOpen, showSettings, myUserId }) => {

  const history = useNavigate();

  return (
    <header className={styles.headerWrapper}>
      {!feed && (
        <img
          className={styles.headerLogo}
          src={logo}
          alt=""
          onClick={() => history(`/profile/${myUserId}`)}
        />
      )}
      {feed && <h2>Стрiчка</h2>}
      {feed && (
        <img
          src={returnBack}
          alt=""
          className={styles.returnIcon}
          onClick={() => history(`/profile/${myUserId}`)}
        />
      )}
      {showSettings && profile && (
        <img
          className={styles.settingsIcon}
          src={settings}
          alt=""
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      )}
    </header>
  );
}

export default Header