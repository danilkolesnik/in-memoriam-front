import React from 'react'
import styles from "./header.module.scss";
import logo from "../../../assets/icons/logo.svg";

const Header = () => {
  return (
    <header className={styles.headerWrapper}>
      <img className={styles.headerLogo} src={logo} alt="" />
    </header>
  );
}

export default Header