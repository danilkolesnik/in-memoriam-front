import React from 'react';
import styles from './sidebar.module.scss';
import close from '../../../assets/icons/close.svg';

const Sidebar = ({isSidebarOpen, setIsSidebarOpen}) => {
  return (
    <div className={styles.darkOverlay}>
      <aside className={styles.sidebarContainer}>
        <header className={styles.sidebarHeader}>
          <h3 className={styles.sidebarTitle}>Налаштування</h3>
          <img className={styles.sidebarClose} src={close} alt="" onClick={() => setIsSidebarOpen(false)} />
        </header>
      </aside>
    </div>
  );
}

export default Sidebar;