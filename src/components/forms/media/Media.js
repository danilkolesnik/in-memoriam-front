import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from './media.module.scss';
import upload from '../../../assets/icons/media-upload.svg';
import camera from '../../../assets/icons/camera.svg';
import { API } from 'utils/constants';

const Media = ({ userInfo }) => {
  const history = useNavigate();
  const [mediaURL, setMediaURL] = useState([]);

  const handleAddMedia = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      // Создаем URL для файла и сохраняем его
      const url = URL.createObjectURL(selectedFile);
      setMediaURL([...mediaURL, url]);

      const formData = new FormData();
      formData.append("media", selectedFile);
      formData.append("id", userInfo?.id); // ID пользователя

      try {
        const response = await axios.post(
          "http://localhost:5000/users/upload-media",
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
          // Добавьте новый медиафайл в состояние или UI
        }
      } catch (error) {
        console.error("Ошибка при загрузке медиафайла:", error);
      }
    }
  }

  useEffect(() => {
    setMediaURL(userInfo?.media);
  }, [userInfo]);
  return (
    <div className={styles.mediaCardWrapper}>
      <div className={styles.photoCard}>
        <input
          className={styles.mediaInput}
          type="file"
          name="media"
          onChange={handleAddMedia}
        />
        <img className={styles.cardImage} src={upload} alt="" />
      </div>
      {mediaURL.map((item, index) => (
        <div key={index} className={styles.photoCard} onClick={() => history("/feed")}>
          {item.type === "video" ? (
            <>
              <video
                className={styles.cardImage}
                src={API + item.url + "#t=0.5"} // используем параметр t=0.5 для захвата кадра на 0.5 секунде
                poster={API + item.url + "#t=0.5"} // использует тот же кадр для превью
                alt=""
                controls={false} // Убираем элементы управления, чтобы не было воспроизведения
                muted // Без звука
              />
              <img className={styles.videoIcon} src={camera} alt="" />
            </>
          ) : (
            <img className={styles.cardImage} src={API + item.url} alt="" />
          )}
        </div>
      ))}
    </div>
  );
}

export default Media