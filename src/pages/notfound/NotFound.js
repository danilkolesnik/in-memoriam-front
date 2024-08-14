import React from 'react';
import Header from 'components/layouts/header/Header';
import styles from './notfound.module.scss';
import notFound from '../../assets/icons/notfound.svg';

const NotFound = () => {
  return (
    <section className={styles.notfoundSection}>
      <Header />

      <div className={styles.notfoundWrapper}>
        <div className={styles.notfoundContainer}>
          <img className={styles.notfoundImage} src={notFound} alt="" />
          <h1>Акаунт не знайдено</h1>
          <p>На жаль, ми не змогли знайти акаунт. Спробуйте пізніше.</p>
        </div>
      </div>
    </section>
  );
}

export default NotFound;