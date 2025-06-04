import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./setup.module.scss";
import Header from "../../components/layouts/header/Header";
import { DateValidate } from "services/DateValidate";
import { API, PROFILE_ROUTE } from "utils/constants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Setup = () => {
  const history = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [passDate, setPassDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      firstName,
      lastName,
      middleName,
      birthDate: birthDate,
      passDate: passDate,
    };

    try {
      
      const response = await axios.put(
        `${API}/users/setup-info`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Данные успешно обновлены");
        localStorage.setItem("userData", JSON.stringify(response.data.user));
        history(`${PROFILE_ROUTE}/${response.data.user.id}`);
      }
    } catch (error) {
      toast.error("Ошибка при обновлении данных:");
    }
  };

  return (
    <section className={styles.setupSection}>
      <Header />
      <div className={styles.setupWrapper}>
        <div className={styles.setupContainer}>
          <h1 className={styles.setupTitle}>Налаштування пам’ятного запису</h1>
          <p className={styles.setupDescription}>
            Почніть з налаштування інформації про вашу близьку людину
          </p>
          <form onSubmit={handleSubmit}>
            <label className={styles.setupLabel} htmlFor="lastname">
              Прiзвище
            </label>
            <input
              className={styles.setupInput}
              type="text"
              name="lastname"
              placeholder="Павлюк"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <label className={styles.setupLabel} htmlFor="name">
              Iм'я
            </label>
            <input
              className={styles.setupInput}
              type="text"
              name="name"
              placeholder="Назар"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <label className={styles.setupLabel} htmlFor="patronymic">
              По-батькові
            </label>
            <input
              className={styles.setupInput}
              type="text"
              name="patronymic"
              placeholder="Євгенійович"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
              required
            />
            <div className={styles.setupHorizontalWrapper}>
              <div className={styles.setupVerticalWrapper}>
                <label className={styles.setupLabel} htmlFor="born">
                  Дата народження
                </label>
                <input
                  className={styles.setupInput}
                  type="text"
                  name="born"
                  placeholder="дд.мм.гггг"
                  value={birthDate}
                  onChange={(e) =>
                    setBirthDate(DateValidate(e.target.value, birthDate))
                  }
                  required
                />
              </div>
              <div className={styles.setupVerticalWrapper}>
                <label className={styles.setupLabel} htmlFor="passed">
                  Дата смерті
                </label>
                <input
                  className={styles.setupInput}
                  type="text"
                  name="passed"
                  placeholder="дд.мм.рррр"
                  value={passDate}
                  onChange={(e) =>
                    setPassDate(DateValidate(e.target.value, passDate))
                  }
                  required
                />
              </div>
            </div>
            <button className={styles.setupButton} type="submit">
              {" "}
              Зберегти зміни та продовжити
            </button>
          </form>
        </div>
      </div>
      {/* <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
      /> */}
    </section>
  );
};

export default Setup;
