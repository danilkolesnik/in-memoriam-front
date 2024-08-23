import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./media.module.scss";
import upload from "../../../assets/icons/media-upload.svg";
import camera from "../../../assets/icons/camera.svg";

import { API, FEED_ROUTE } from "utils/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Media = ({ userInfo, myUserId, idParam, isLoading, setIsLoading }) => {
  const [mediaURL, setMediaURL] = useState([]);
  
  const handleAddMedia = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setIsLoading(true);
      const url = URL.createObjectURL(selectedFile);

      if (selectedFile.type.startsWith("image/")) {
        setMediaURL((prevMediaURL) => [
          ...prevMediaURL,
          {
            type: "photo",
            url: url,
          },
        ]);
      } else if (selectedFile.type.startsWith("video/")) {
        setMediaURL((prevMediaURL) => [
          ...prevMediaURL,
          {
            type: "video",
            url: url,
          },  
        ]);
      } else {
        toast.error('Невiрний тип файлу!');
        setIsLoading(false);
        return
      }

      // setMediaURL((prevMediaURL) => [...prevMediaURL, url]);

      const formData = new FormData();
      formData.append("media", selectedFile);
      formData.append("id", userInfo?.id);

      try {
        const response = await axios.post(
          `${API}/users/upload-media`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.status === 200) {
          console.log("Медиафайл успешно загружен:", response.data);
          setIsLoading(false);

        }
      } catch (error) {
        toast.error("На жаль, сталася помилка");
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (userInfo?.media) {
      const mediaArray = Array.isArray(userInfo.media)
        ? userInfo.media
        : Object.values(userInfo.media);

      const updatedMediaArray = mediaArray.map((mediaItem) => {
        return {
          ...mediaItem,
          url: `${API}/${mediaItem.url}`,
        };
      });

      setMediaURL(updatedMediaArray);
    }
  }, [userInfo]);

  return (
    <div className={styles.mediaCardWrapper}>
      {myUserId === userInfo?.id && (
        <div className={styles.photoCard}>
          <input
            className={styles.mediaInput}
            type="file"
            name="media"
            onChange={handleAddMedia}
          />
          <img className={styles.cardImage} src={upload} alt="" />
        </div>
      )}
      {mediaURL?.map((item, index) => (
        <a
          key={index}
          className={styles.photoCard}
          href={FEED_ROUTE + "/" + idParam}
        >
          {item.url &&
            (item.type === "video" ? (
              <>
                <video
                  className={styles.cardImage}
                  src={item.url + "#t=0.1"}
                  poster={item.url + "#t=0.1"}
                  alt=""
                  controls={false}
                  muted
                  onLoadedMetadata={(e) => (e.target.style.display = "block")}
                  style={{ display: "none" }}
                />
                <img className={styles.videoIcon} src={camera} alt="" />
              </>
            ) : (
              <img className={styles.cardImage} src={item.url} alt="" />
            ))}
        </a>
      ))}
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
};

export default Media;
