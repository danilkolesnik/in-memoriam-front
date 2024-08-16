import React, { useState, useEffect } from "react";
import styles from "./profile.module.scss";
import axios from "axios";
import Header from "components/layouts/header/Header";
import Sidebar from "components/layouts/sidebar/Sidebar";
import avatar from "../../assets/icons/avatar-sample.svg";
import add from "../../assets/icons/add.svg";

const Profile = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("info");

  const [userInfo, setUserInfo] = useState([]);

  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);

      // Создаем URL для файла и сохраняем его
      const url = URL.createObjectURL(selectedFile);
      setFileURL(url);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users/get-info", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Добавляем токен из localStorage
        },
      });

      if (response.status === 200) {
        console.log("Информация о пользователе:", response.data);
        localStorage.setItem("userData", JSON.stringify(response.data));
        setUserInfo(response.data);
      }
    } catch (error) {
      console.error("Ошибка при получении данных пользователя:", error);
    }
  };

  useEffect(() => {
    fetchUserData()
  }, []);

  return (
    <section className={styles.profileSection}>
      <Header
        profile
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className={styles.profileWrapper}>
        <div className={styles.profileContainer}>
          <div className={styles.profileBanner}></div>
          <div className={styles.imageSettingsContainer}>
            <div className={styles.avatarContainer}>
              <input
                type="file"
                name="avatar"
                className={styles.fileInput}
                onChange={handleFileChange}
              />
              {fileURL ? (
                <img className={styles.avatarImage} src={fileURL} alt="" />
              ) : (
                <img className={styles.avatarImage} src={avatar} alt="" />
              )}
            </div>
            <img className={styles.addImage} src={add} alt="" />
            <a className={styles.editButton} href="/edit">
              Змiнити
            </a>
          </div>
          <div className={styles.mainInfoContainer}>
            <h3>
              {userInfo?.firstName} {userInfo?.lastName} {userInfo?.middleName}
            </h3>
            <p>
              <span>{userInfo?.birthDate}</span>
              <svg
                width="9"
                height="12"
                viewBox="0 0 9 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.7 0.75L4.7 11.25M1.25 3.9L8.45 3.9"
                  stroke="black"
                  stroke-width="0.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span>{userInfo?.passDate}</span>
            </p>
          </div>
          <article>
            <header className={styles.infoHeader}>
              <div
                className={
                  activeTab === "info"
                    ? styles.toggleElementActive
                    : styles.toggleElement
                }
                onClick={() => setActiveTab("info")}
              >
                Про мене
              </div>
              <div
                className={
                  activeTab === "media"
                    ? styles.toggleElementActive
                    : styles.toggleElement
                }
                onClick={() => setActiveTab("media")}
              >
                Медiа
              </div>
            </header>
            {activeTab === "info" && (
              <div className={styles.textInfoWrapper}>
                <textarea
                  className={styles.textAreaQuote}
                  defaultValue={userInfo?.quote}
                  maxLength="150"
                  placeholder="«Його творчість і щедрість духу надихали всіх, хто його знав»"
                />
                <textarea
                  className={styles.textAreaInfo}
                  maxLength="150"
                  defaultValue={userInfo?.bio}
                  placeholder="Назар був відомий своєю добротою і почуттям гумору. Він завжди був готовий підтримати і допомогти близьким у важкі часи. Його друзі згадують, як він організовував затишні вечори у своєму домі, де всі почувалися як удома."
                />
              </div>
            )}
            {activeTab === "media" && (
              <div className={styles.mediaCardWrapper}>
                <div className={styles.photoCard}></div>
                <div className={styles.photoCard}></div>
                <div className={styles.photoCard}></div>
                <div className={styles.photoCard}></div>
                <div className={styles.photoCard}></div>
                <div className={styles.photoCard}></div>
                <div className={styles.photoCard}></div>
                <div className={styles.photoCard}></div>
                <div className={styles.photoCard}></div>
              </div>
            )}
          </article>
        </div>
      </div>
      {isSidebarOpen && (
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      )}
    </section>
  );
};

export default Profile;
