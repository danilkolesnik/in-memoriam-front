import React, { useState, useEffect } from 'react';
import styles from './bio.module.scss';
import axios from "axios";
import { API } from 'utils/constants';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Bio = ({ userInfo, myUserId }) => {
  
  const [quote, setQuote] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    setQuote(userInfo?.quote || "");
    setBio(userInfo?.bio || "");
  }, [userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
        id: userInfo?.id,
        bio,
        quote,
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
          console.log("Данные успешно обновлены:", response.data);
          localStorage.setItem("userData", JSON.stringify(response.data));
        }
      } catch (error) {
        toast.error("На жаль, сталася помилка");
      }
  }

  return (
    <form className={styles.textInfoWrapper} onSubmit={handleSubmit}>
      {myUserId === userInfo?.id ? (
        <>
          <textarea
            className={styles.textAreaQuote}
            defaultValue={userInfo?.quote}
            onChange={(e) => setQuote(e.target.value)}
            readOnly={myUserId !== userInfo?.id}
            maxLength="150"
            placeholder="«Його творчість і щедрість духу надихали всіх, хто його знав»"
          />
          <textarea
            className={styles.textAreaInfo}
            maxLength="1000"
            defaultValue={userInfo?.bio}
            onChange={(e) => setBio(e.target.value)}
            readOnly={myUserId !== userInfo?.id}
            placeholder="Назар був відомий своєю добротою і почуттям гумору. Він завжди був готовий підтримати і допомогти близьким у важкі часи. Його друзі згадують, як він організовував затишні вечори у своєму домі, де всі почувалися як удома."
          />
        </>
      ) : (
        <div className={styles.uneditableInfoWrapper}>
          <h4>«{userInfo?.quote}»</h4>
          <p>{userInfo?.bio}</p>
        </div>
      )}

      {(quote !== userInfo?.quote || bio !== userInfo?.bio) && (
        <button className={styles.saveButton} type="submit">
          Зберегти
        </button>
      )}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
      />
    </form>
  );
}

export default Bio;