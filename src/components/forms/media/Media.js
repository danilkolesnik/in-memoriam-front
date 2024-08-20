import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./media.module.scss";
import upload from "../../../assets/icons/media-upload.svg";
import camera from "../../../assets/icons/camera.svg";
import { API, FEED_ROUTE } from "utils/constants";
import { ToastContainer, toast } from "react-toastify";

const Media = ({ userInfo, myUserId, idParam }) => {
  const history = useNavigate();
  const [mediaURL, setMediaURL] = useState([]);

  const handleAddMedia = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
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

        }
      } catch (error) {
        console.error("Ошибка при загрузке медиафайла:", error);
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

  useEffect(() => {
    console.log(mediaURL);
  }, [mediaURL]);

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
        <div
          key={index}
          className={styles.photoCard}
          onClick={() => history(`${FEED_ROUTE}/${idParam}`)}
        >
          {item.url &&
            (item.type === "video" ? (
              <>
                <video
                  className={styles.cardImage}
                  src={item.url + "#t=0.5"}
                  poster={item.url + "#t=0.5"}
                  alt=""
                  controls={false}
                  muted
                />
                <img className={styles.videoIcon} src={camera} alt="" />
              </>
            ) : (
              <img className={styles.cardImage} src={item.url} alt="" />
            ))}
        </div>
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
