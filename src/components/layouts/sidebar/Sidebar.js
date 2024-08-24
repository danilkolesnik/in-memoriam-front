import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./sidebar.module.scss";
import axios from "axios";
import close from "../../../assets/icons/close.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API } from "utils/constants";
import ToggleButton from "react-toggle-button";

const Sidebar = ({
  userInfo,
  setUserInfo,
  isSidebarOpen,
  setIsSidebarOpen,
}) => {

  const history = useNavigate();

  const [isPrivate, setIsPrivate] = useState(userInfo?.isPrivate);
  const [cooldownActive, setCooldownActive] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    setIsPrivate(userInfo?.isPrivate);
  }, [userInfo]);

  const handleUpdateVisibility = async (checked) => {

    setIsPrivate(checked);
    
    if (cooldownActive) {
      toast.error("Зачекай, будь ласка!");
    }
    if (cooldownActive) return;

    const userData = {
      isPrivate: checked,
    };

    try {
      const response = await axios.patch(`${API}/users/update-info`, userData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        localStorage.setItem("userData", JSON.stringify(response.data));
        setIsPrivate(checked);
        const updatedUserInfo = {
          ...userInfo,
          isPrivate: checked,
        };
        setUserInfo(updatedUserInfo);
        setCooldownActive(true);
        timeoutRef.current = setTimeout(() => {
          setCooldownActive(false);
        }, 5000);
      }
    } catch (error) {
      toast.error("На жаль, сталася помилка");
    }
  };

  const handleLogOut = () => {
    localStorage.clear();
    history('/');
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
        <div className={styles.sidebarContent}>
          {/* <ToggleSwitch
            isPrivate={isPrivate}
            handleUpdateVisibility={handleUpdateVisibility}
            label="Приватний профiль"
          /> */}
          <div className={styles.contentHorizontalWrapper}>
            <span className={styles.contentLabel} onClick={handleLogOut}>
              Приватний профiль
            </span>
            <ToggleButton
              inactiveLabel={" "}
              activeLabel={" "}
              colors={{
                activeThumb: {
                  base: "#FFF",
                },
                inactiveThumb: {
                  base: "#FFF",
                },
                active: {
                  base: "#000",
                },
                inactive: {
                  base: "#bbb",
                  hover: "#bbb",
                },
              }}
              trackStyle={{height: "30px"}}
              value={isPrivate}
              onToggle={() => handleUpdateVisibility(!isPrivate)}
            />
          </div>
          <span className={styles.logOut} onClick={handleLogOut}>
            Вийти з акаунту
          </span>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
