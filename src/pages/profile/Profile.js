import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./profile.module.scss";
import axios from "axios";
import Header from "../../components/layouts/header/Header";
import Sidebar from "../../components/layouts/sidebar/Sidebar";
import avatar from "../../assets/icons/avatar-sample.svg";
import add from "../../assets/icons/add.svg";
import Bio from "../../components/forms/bio/Bio";
import Media from "../../components/forms/media/Media";
import { API } from "utils/constants";

const Profile = () => {
  const { id } = useParams(); // Извлекаем параметр ID из URL
  const myUserId = JSON.parse(localStorage.getItem("myUserId"));

  const navigate = useNavigate(); // Для перенаправления на страницу NotFound
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("bio");

  const [userInfo, setUserInfo] = useState([]);
  const [avatarURL, setAvatarURL] = useState("");
  const [bannerURL, setBannerURL] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/users/users/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Добавляем токен из localStorage
            },
          }
        );

        if (response.status === 200) {
          console.log("Информация о пользователе:", response.data);
          localStorage.setItem("userData", JSON.stringify(response.data));
          setUserInfo(response.data);
          setAvatarURL(API + response.data.avatar);
          setBannerURL(API + response.data.banner);
        }
      } catch (error) {
        console.error("Ошибка при получении данных пользователя:", error);
        navigate("/not-found"); // Перенаправляем на страницу NotFound, если пользователь не найден
      }
    };

    fetchUserData();
  }, [id, navigate]);

  const handleAvatarChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setAvatarURL(url);

      const formData = new FormData();
      formData.append("avatar", selectedFile);

      try {
        const response = await axios.post(
          "http://localhost:5000/users/upload-avatar",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.status === 200) {
          console.log("Аватар успешно загружен", response.data.avatar);
        }
      } catch (error) {
        console.error("Ошибка при загрузке аватара:", error);
      }
    }
  };

  const handleBannerChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setBannerURL(url);

      const formData = new FormData();
      formData.append("banner", selectedFile);

      try {
        const response = await axios.post(
          "http://localhost:5000/users/upload-banner",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.status === 200) {
          console.log("Баннер успешно загружен", response.data.banner);
        }
      } catch (error) {
        console.error("Ошибка при загрузке баннера:", error);
      }
    }
  };

  return (
    <section className={styles.profileSection}>
      <Header
        profile
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        showSettings={myUserId === id}
        myUserId={myUserId}
      />
      <div className={styles.profileWrapper}>
        <div className={styles.profileContainer}>
          <div className={styles.profileBanner}>
            {userInfo?.banner && (
              <img className={styles.bannerImage} src={bannerURL} alt="" />
            )}
          </div>
          <div className={styles.imageSettingsContainer}>
            <div className={styles.avatarContainer}>
              {myUserId === id && (
                <input
                  type="file"
                  name="avatar"
                  className={styles.fileInput}
                  onChange={handleAvatarChange}
                />
              )}

              {userInfo?.avatar ? (
                <img className={styles.avatarImage} src={avatarURL} alt="" />
              ) : (
                <img className={styles.avatarImage} src={avatar} alt="" />
              )}
            </div>
            {myUserId === id && (
              <div className={styles.bannerInputContainer}>
                <input
                  type="file"
                  name="banner"
                  className={styles.fileInput}
                  onChange={handleBannerChange}
                />
                <img className={styles.addImage} src={add} alt="" />
              </div>
            )}
            {myUserId === id && (
              <a className={styles.editButton} href="/edit">
                Змiнити
              </a>
            )}
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
                  strokeWidth="0.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{userInfo?.passDate}</span>
            </p>
          </div>
          <article>
            <header className={styles.infoHeader}>
              <div
                className={
                  activeTab === "bio"
                    ? styles.toggleElementActive
                    : styles.toggleElement
                }
                onClick={() => setActiveTab("bio")}
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
            {activeTab === "bio" && (
              <Bio userInfo={userInfo} myUserId={myUserId} />
            )}
            {activeTab === "media" && (
              <Media userInfo={userInfo} myUserId={myUserId} />
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
