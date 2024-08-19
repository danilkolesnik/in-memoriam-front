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
import { API, LOG_IN_ROUTE, NOT_FOUND_ROUTE } from "utils/constants";

const Profile = () => {
  const { id } = useParams();
  const myUserId = JSON.parse(localStorage.getItem("myUserId"));
  const token = localStorage.getItem("token");
  
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("bio");

  const [userInfo, setUserInfo] = useState([]);
  const [avatarURL, setAvatarURL] = useState(null);
  const [bannerURL, setBannerURL] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${API}/users/users/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {

          if (response.data.isPrivate && !token) {
            sessionStorage.setItem("requestedProfileID", id);
            navigate(LOG_IN_ROUTE);
            return;
          }
          localStorage.setItem("userData", JSON.stringify(response.data));
          setUserInfo(response.data);

          if (typeof response.data.avatar === "string") {
            setAvatarURL(API + "/" + response.data.avatar);
          }
          
          if (typeof response.data.banner === "string") {
            setBannerURL(API + "/" + response.data.banner);
          }


        }
      } catch (error) {
        console.error("Ошибка при получении данных пользователя:", error);
        navigate(NOT_FOUND_ROUTE); 
      }
    };

    fetchUserData();
  }, [id, navigate, token]);

  const handleAvatarChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setAvatarURL(url);

      const formData = new FormData();
      formData.append("avatar", selectedFile);

      try {
        const response = await axios.post(
          `${API}/users/upload-avatar`,
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
          `${API}/users/upload-banner`,
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
            {bannerURL && (
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

              {avatarURL ? (
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
              <Media userInfo={userInfo} myUserId={myUserId} idParam={id} />
            )}
          </article>
        </div>
      </div>
      {isSidebarOpen && (
        <Sidebar
          userInfo={userInfo}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      )}
    </section>
  );
};

export default Profile;
