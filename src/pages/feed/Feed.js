import React, { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "components/layouts/header/Header";
import styles from "./feed.module.scss";
import { API, LOG_IN_ROUTE } from "utils/constants";
import camera from "../../assets/icons/camera.svg";
import trash from "../../assets/icons/trash.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Feed = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const myUserId = JSON.parse(localStorage.getItem("myUserId"));

  const [userInfo, setUserInfo] = useState([]);

  const [currentPlaying, setCurrentPlaying] = useState(null);
  const videoRefs = useRef([]);
  const canvasRefs = useRef([]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${API}/users/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        if (response.data.isPrivate && !token) {
          sessionStorage.setItem("requestedProfileID", id);
          navigate(LOG_IN_ROUTE);
          return;
        }

        localStorage.setItem("userData", JSON.stringify(response.data));
        setUserInfo(response.data);
      }
    } catch (error) {
      toast.error("Сталася помилка");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
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

  const handleDeleteMedia = async (mediaId) => {
    try {
      const response = await axios.delete(
        `${API}/users/delete-media/${userInfo.id}/${mediaId}`
      );

      if (response.status === 200) {
        console.log("Медиафайл успешно удален");

        setUserInfo((prevState) => ({
          ...prevState,
          media: prevState.media.filter((media) => media.id !== mediaId),
        }));
      }
    } catch (error) {
      console.error("Ошибка при удалении медиафайла:", error);
    }
  };

  return (
    <section className={styles.feedSection}>
      <Header feed />
      <div className={styles.feedWrapper}>
        <div className={styles.feedContainer}>
          {userInfo?.media?.map((media, index) => (
            <div key={media.id} className={styles.mediaItem}>
              {media.type === "video" ? (
                <>
                  {/* <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    className={styles.video}
                    src={API + "/" + media.url}
                    onClick={() => handlePlayPause(index)}
                    muted={currentPlaying !== index}
                    loop
                    playsInline
                    preload="metadata"
                  /> */}
                  <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    className={styles.mediaItem}
                    src={API + "/" + media.url + "#t=0.1"}
                    poster={API + "/" + media.url + "#t=0.1"}
                    alt=""
                    controls={false}
                    muted={currentPlaying !== index}
                    onClick={() => handlePlayPause(index)}
                    onLoadedMetadata={(e) => (e.target.style.display = "block")}
                    playsInline
                    style={{ display: "none" }}
                  />
                  <img className={styles.videoIcon} src={camera} alt="" />
                  {myUserId === id && myUserId && id && (
                    <img
                      className={styles.trashIcon}
                      src={trash}
                      alt=""
                      onClick={() => handleDeleteMedia(media.id)}
                    />
                  )}
                </>
              ) : (
                <>
                  <img
                    className={styles.image}
                    src={API + "/" + media.url}
                    alt="Media"
                  />
                  {myUserId === id && myUserId && id && (
                    <img
                      className={styles.trashIcon}
                      src={trash}
                      alt=""
                      onClick={() => handleDeleteMedia(media.id)}
                    />
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feed;
