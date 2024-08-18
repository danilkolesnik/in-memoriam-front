import React, { useRef, useState, useEffect } from 'react'
import axios from "axios";
import Header from 'components/layouts/header/Header';
import styles from './feed.module.scss';
import { API } from 'utils/constants';
import camera from "../../assets/icons/camera.svg";

const Feed = () => {

  const [userInfo, setUserInfo] = useState([]);

  const [currentPlaying, setCurrentPlaying] = useState(null);
  const videoRefs = useRef([]);
  const canvasRefs = useRef([]);

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
    fetchUserData();
  }, []);

  useEffect(() => {
    // Пройти по каждому видео и создать превью
    userInfo?.media?.forEach((media, index) => {
      if (media.type === "video") {
        const video = videoRefs.current[index];
        const canvas = canvasRefs.current[index];
        if (video && canvas) {
          const ctx = canvas.getContext("2d");
          video.addEventListener("loadeddata", () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          });
        }
      }
    });
  }, [userInfo]);

  const handlePlayPause = (index) => {
    const video = videoRefs.current[index];
    if (video) {
      if (video.paused) {
        video.play();
        setCurrentPlaying(index);
      } else {
        video.pause();
        setCurrentPlaying(null);
      }
    }
  };

  return (
    <section className={styles.feedSection}>
      <Header feed />
      <div className={styles.feedWrapper}>
        <div className={styles.feedContainer}>
          {userInfo?.media?.map((media, index) => (
            <div key={media.id} className={styles.mediaItem}>
              {media.url.endsWith(".mp4") ? (
                <>
                  <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    className={styles.video}
                    src={API + media.url}
                    onClick={() => handlePlayPause(index)}
                    muted={currentPlaying !== index}
                    loop
                    playsInline
                    style={{ cursor: "pointer" }}
                  />
                  <img className={styles.videoIcon} src={camera} alt="" />
                </>
              ) : (
                <img
                  className={styles.image}
                  src={API + media.url}
                  alt="Media"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Feed