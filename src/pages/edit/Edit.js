import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./edit.module.scss";
import Header from "../../components/layouts/header/Header";
import axios from "axios";
import { DateValidate } from "services/DateValidate";
import { API, PROFILE_ROUTE } from "utils/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Edit = () => {
  const history = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const myUserId = JSON.parse(localStorage.getItem("myUserId"));

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [birthDate, setBirthDate] = useState(userInfo?.birthDate || "");
  const [passDate, setPassDate] = useState(userInfo?.passDate || "");

  useEffect(() => {
    setUserInfo(JSON.parse(localStorage.getItem("userData")));
  }, []);

  useEffect(() => {
    setFirstName(userInfo?.firstName || "");
    setLastName(userInfo?.lastName || "");
    setMiddleName(userInfo?.middleName || "");
    setBirthDate(userInfo?.birthDate || "");
    setPassDate(userInfo?.passDate || "");
  }, [userInfo]);

  const handleBirthChange = (e) => {
    const newDate = e.target.value;
    setBirthDate(DateValidate(newDate, birthDate));
  };

  const handlePassChange = (e) => {
    const newDate = e.target.value;
    setPassDate(DateValidate(newDate, passDate));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      id: userInfo.id,
      firstName,
      lastName,
      middleName,
      birthDate,
      passDate,
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
        history(`${PROFILE_ROUTE}/${myUserId}`);
      }
    } catch (error) {
      toast.error("На жаль, сталася помилка");
    }
  };

  return (
    <section className={styles.editSection}>
      <Header></Header>
      <div className={styles.editWrapper}>
        <div className={styles.editContainer}>
          <h1 className={styles.editTitle}>Редагування пам’ятного запису</h1>
          <form onSubmit={handleSubmit}>
            <label className={styles.editLabel} htmlFor="lastname">
              Прiзвище
            </label>
            <input
              className={styles.editInput}
              type="text"
              name="lastname"
              placeholder="Павлюк"
              defaultValue={userInfo?.lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <label className={styles.editLabel} htmlFor="name">
              Iм'я
            </label>
            <input
              className={styles.editInput}
              type="text"
              name="name"
              placeholder="Назар"
              defaultValue={userInfo?.firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <label className={styles.editLabel} htmlFor="patronymic">
              По-батькові
            </label>
            <input
              className={styles.editInput}
              type="text"
              name="patronymic"
              placeholder="Євгенійович"
              defaultValue={userInfo?.middleName}
              onChange={(e) => setMiddleName(e.target.value)}
              required
            />
            <div className={styles.editHorizontalWrapper}>
              <div className={styles.editVerticalWrapper}>
                <label className={styles.editLabel} htmlFor="born">
                  Дата народження
                </label>
                <input
                  className={styles.editInput}
                  type="text"
                  name="born"
                  placeholder="дд.мм.рррр"
                  value={birthDate}
                  defaultValue={userInfo?.birthDate}
                  onChange={handleBirthChange}
                  required
                />
              </div>
              <div className={styles.editVerticalWrapper}>
                <label className={styles.editLabel} htmlFor="passed">
                  Дата смерті
                </label>
                <input
                  className={styles.editInput}
                  type="text"
                  name="passed"
                  placeholder="дд.мм.рррр"
                  defaultValue={userInfo?.passDate}
                  value={passDate}
                  onChange={handlePassChange}
                  required
                />
              </div>
            </div>
            <button className={styles.editButton} type="submit">
              {" "}
              Зберегти зміни
            </button>
          </form>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
      />
    </section>
  );
};

export default Edit;
