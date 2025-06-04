import React from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "./header.module.scss";
import logo from "../../../assets/icons/logo.svg";
import settings from "../../../assets/icons/settings.svg";  
import returnBack from "../../../assets/icons/return.svg";
import { PROFILE_ROUTE } from 'utils/constants';

const Header = ({ profile, feed, isSidebarOpen, setIsSidebarOpen, showSettings }) => {

  const { id } = useParams();
  const myUserId = JSON.parse(localStorage.getItem("myUserId"));
  const history = useNavigate();

  return (
    <header className={styles.headerWrapper}>
      {!feed && (
        <img
          className={styles.headerLogo}
          src={logo}
          alt=""
          onClick={() => history(`${PROFILE_ROUTE}/${myUserId}`)}
        />
      )}
      {feed && <h2>Стрiчка</h2>}
      {feed && (
        <img
          src={returnBack}
          alt=""
          className={styles.returnIcon}
          onClick={() => history(`${PROFILE_ROUTE}/${id}`)}
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