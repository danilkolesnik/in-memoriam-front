import React, { useState } from 'react'
import styles from "./auth.module.scss";
import Header from '../../components/layouts/header/Header';
import eye from '../../assets/icons/eye.svg';

const Auth = () => {

  const [isPassVisible, setIsPassVisible] = useState(false);

  return (
    <section className={styles.authSection}>
      <Header />

      <div className={styles.authWrapper}>
        <div className={styles.authContainer}>
          <h1 className={styles.authTitle}>Вхiд</h1>
          <p className={styles.authDescription}>
            Будь ласка, введіть ваші дані для входу в обліковий запис
          </p>
          <form className={styles.authForm}>
            <input
              className={styles.authInput}
              placeholder="Логiн"
              type="text"
              name="login"
            />
            <div className={styles.passwordWrapper}>
              <input
                className={styles.authInput}
                placeholder="Пароль"
                type={isPassVisible ? "text" : "password"}
                name="password"
              />
              <img
                className={styles.eyeIcon}
                src={eye}
                alt=""
                onClick={() => setIsPassVisible(!isPassVisible)}
              />
            </div>
            <button className={styles.authButton} type="submit">
              {" "}
              Увiйти
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Auth