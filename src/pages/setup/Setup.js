import React from 'react'
import styles from "./setup.module.scss";
import Header from "../../components/layouts/header/Header";

const Setup = () => {
  return (
    <section className={styles.setupSection}>
      <Header></Header>
      <div className={styles.setupWrapper}>
        <div className={styles.setupContainer}>
          <h1 className={styles.setupTitle}>Налаштування пам’ятного запису</h1>
          <p className={styles.setupDescription}>
            Почніть з налаштування інформації про вашу близьку людину
          </p>
          <form>
            <label className={styles.setupLabel} htmlFor="name">
              Iм'я
            </label>
            <input
              className={styles.setupInput}
              type="text"
              name="name"
              placeholder="Назар"
            />
            <label className={styles.setupLabel} htmlFor="lastname">
              Прiзвище
            </label>
            <input
              className={styles.setupInput}
              type="text"
              name="lastname"
              placeholder="Павлюк"
            />
            <label className={styles.setupLabel} htmlFor="patronymic">
              По-батькові
            </label>
            <input
              className={styles.setupInput}
              type="text"
              name="patronymic"
              placeholder="Євгенійович"
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
                  placeholder="дд.мм.рррр"
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
    </section>
  );
}

export default Setup;