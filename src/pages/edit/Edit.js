import React from 'react'
import styles from "./edit.module.scss";
import Header from "../../components/layouts/header/Header";

const Edit = () => {
  return (
    <section className={styles.editSection}>
      <Header></Header>
      <div className={styles.editWrapper}>
        <div className={styles.editContainer}>
          <h1 className={styles.editTitle}>Редагування пам’ятного запису</h1>
          <form>
            <label className={styles.editLabel} htmlFor="name">
              Iм'я
            </label>
            <input
              className={styles.editInput}
              type="text"
              name="name"
              placeholder="Назар"
              defaultValue="Назар"
            />
            <label className={styles.editLabel} htmlFor="lastname">
              Прiзвище
            </label>
            <input
              className={styles.editInput}
              type="text"
              name="lastname"
              placeholder="Павлюк"
              defaultValue="Павлюк"
            />
            <label className={styles.editLabel} htmlFor="patronymic">
              По-батькові
            </label>
            <input
              className={styles.editInput}
              type="text"
              name="patronymic"
              placeholder="Євгенійович"
              defaultValue="Євгенійович"
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
                  defaultValue="19.08.1960"
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
                  defaultValue="27.03.2020"
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
    </section>
  );
}

export default Edit;