import React, { useState } from 'react';
import styles from './profile.module.scss';
import Header from 'components/layouts/header/Header';
import Sidebar from 'components/layouts/sidebar/Sidebar';
import avatar from '../../assets/icons/avatar-sample.svg';
import add from '../../assets/icons/add.svg';

const Profile = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('info');

  return (
    <section className={styles.profileSection}>
      <Header
        profile
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className={styles.profileWrapper}>
        <div className={styles.profileContainer}>
          <div className={styles.profileBanner}></div>
          <div className={styles.imageSettingsContainer}>
            <div className={styles.avatarContainer}>
              <img className={styles.avatarImage} src={avatar} alt="" />
            </div>
            <img className={styles.addImage} src={add} alt="" />
            <a className={styles.editButton} href="/edit">
              Змiнити
            </a>
          </div>
          <div className={styles.mainInfoContainer}>
            <h3>Назар Павлюк </h3>
            <p>
              <span>19.08.1960</span>
              <svg
                width="9"
                height="12"
                viewBox="0 0 9 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.7 0.75L4.7 11.25M1.25 3.9L8.45 3.9"
                  stroke="black"
                  stroke-width="0.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span>27.03.2020</span>
            </p>
          </div>
          <article>
            <header className={styles.infoHeader}>
              <div
                className={
                  activeTab === "info"
                    ? styles.toggleElementActive
                    : styles.toggleElement
                }
                onClick={() => setActiveTab("info")}
              >
                Про мене
              </div>
              <div
                className={
                  activeTab === "media"
                    ? styles.toggleElementActive
                    : styles.toggleElement
                }
                onClick={() => setActiveTab("media")}
              >
                Медiа
              </div>
            </header>
            {activeTab === "info" && (
              <div className={styles.textInfoWrapper}>
                <textarea
                  className={styles.textAreaQuote}
                  maxLength="150"
                  placeholder="«Його творчість і щедрість духу надихали всіх, хто його знав»"
                />
                <textarea
                  className={styles.textAreaInfo}
                  maxLength="150"
                  placeholder="Назар був відомий своєю добротою і почуттям гумору. Він завжди був готовий підтримати і допомогти близьким у важкі часи. Його друзі згадують, як він організовував затишні вечори у своєму домі, де всі почувалися як удома."
                />
              </div>
            )}
            {activeTab === "media" && (
              <div className={styles.mediaCardWrapper}>
                <div className={styles.photoCard}></div>
                <div className={styles.photoCard}></div>
                <div className={styles.photoCard}></div>
                <div className={styles.photoCard}></div>
                <div className={styles.photoCard}></div>
                <div className={styles.photoCard}></div>
                <div className={styles.photoCard}></div>
                <div className={styles.photoCard}></div>
                <div className={styles.photoCard}></div>
              </div>
            )}
          </article>
        </div>
      </div>
      {isSidebarOpen && <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />}
    </section>
  );
}

export default Profile