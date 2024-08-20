import React, { useState, useEffect, useRef } from "react";
import styles from './sidebar.module.scss';
import axios from "axios";
import close from '../../../assets/icons/close.svg';
import ToggleSwitch from 'ui/ToggleSwitch';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API } from "utils/constants";

const Sidebar = ({ userInfo, isSidebarOpen, setIsSidebarOpen }) => {
  
  const [isPrivate, setIsPrivate] = useState(false);
  const [cooldownActive, setCooldownActive] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    setIsPrivate(userInfo?.isPrivate);
  }, [userInfo]);
  
  const handleUpdateVisibility = async (checked) => {
    if (cooldownActive) {
      toast.error('Зачекай, будь ласка!');
    };
    if (cooldownActive) return;

    setIsPrivate(checked);

    const userData = {
      isPrivate: checked,
    };

    try {
        
        const response = await axios.patch(
          `${API}/users/update-info`, 
          userData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {

          localStorage.setItem("userData", JSON.stringify(response.data));

          setCooldownActive(true);
          timeoutRef.current = setTimeout(() => {
            setCooldownActive(false); 
          }, 5000);

        }
      } catch (error) {
        toast.error("На жаль, сталася помилка");
    }
    
  };

  return (
    <div className={styles.darkOverlay}>
      <aside className={styles.sidebarContainer}>
        <header className={styles.sidebarHeader}>
          <h3 className={styles.sidebarTitle}>Налаштування</h3>
          <img
            className={styles.sidebarClose}
            src={close}
            alt=""
            onClick={() => setIsSidebarOpen(false)}
          />
        </header>
        <ToggleSwitch
          isPrivate={isPrivate}
          handleUpdateVisibility={handleUpdateVisibility}
          label="Приватний профiль"
        />
      </aside>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
      />
    </div>
  );
}

export default Sidebar;