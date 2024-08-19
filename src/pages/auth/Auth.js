import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CryptoJS from "crypto-js";
import styles from "./auth.module.scss";
import Header from "../../components/layouts/header/Header";
import eye from "../../assets/icons/eye.svg";
import { API, SETUP_ROUTE, PROFILE_ROUTE } from "utils/constants";

const Auth = ({ isLogin }) => {
  const history = useNavigate();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [error, setError] = useState("");

  //todo hide key to .env
  const secretKey = "h5v7y9z^&*b2!@1c3$kq#u@9e$%x6l1";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const encryptedPassword = CryptoJS.AES.encrypt(
      password,
      secretKey
    ).toString();

    try {
      const response = await axios.post(`${API}/users/login`, {
        login: login,
        password: encryptedPassword,
      });
      setError("");
      localStorage.setItem("userData", JSON.stringify(response.data.user));
      localStorage.setItem("myUserId", JSON.stringify(response.data.user.id));
      localStorage.setItem("token", response.data.token);
      if (isLogin) {
        history(
          `${PROFILE_ROUTE}/${sessionStorage.getItem("requestedProfileID")}`
        );
        return
      }
      if (
        !response.data.user.firstName ||
        !response.data.user.lastName ||
        !response.data.user.middleName
      ) {
        history(SETUP_ROUTE);
      } else {
        history(`${PROFILE_ROUTE}/${response.data.user.id}`);
      }
    } catch (error) {
      setError("Неверный логин или пароль.");
      console.error("Ошибка при входе:", error);
    }
  };

  return (
    <section className={styles.authSection}>
      <Header />

      <div className={styles.authWrapper}>
        <div className={styles.authContainer}>
          <h1 className={styles.authTitle}>Вхiд</h1>
          {isLogin ? (
            <p className={styles.authDescription}>
              Цей профіль не публічний для перегляду, будь ласка, введіть ваш
              логін і пароль
            </p>
          ) : (
            <p className={styles.authDescription}>
              Будь ласка, введіть ваші дані для входу в обліковий запис
            </p>
          )}
          <form className={styles.authForm} onSubmit={handleSubmit}>
            <input
              className={styles.authInput}
              placeholder="Логин"
              type="text"
              name="login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
            />
            <div className={styles.passwordWrapper}>
              <input
                className={styles.authInput}
                placeholder="Пароль"
                type={isPassVisible ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <img
                className={styles.eyeIcon}
                src={eye}
                alt="Показать/Скрыть пароль"
                onClick={() => setIsPassVisible(!isPassVisible)}
              />
            </div>
            {error && <p className={styles.errorMessage}>{error}</p>}
            <button className={styles.authButton} type="submit">
              Войти
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Auth;
