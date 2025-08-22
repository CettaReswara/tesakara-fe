import styles from "./Template1Timeline.module.css";
import React from "react";

export default function Template1Timeline() {
  return (
    <div className={styles.timelineStory}>
      <div className={styles.popupBg} />

      <i className={styles.ourStory}>Our Story</i>

      <ul className={styles.cardList}>
        <li className={styles.cardItem}>
          <div className={styles.left}>
            <div className={styles.dot} />
            <div className={styles.stem} />
          </div>
          <div className={styles.card}>
            <div className={styles.cardTitle}>Ta’aruf</div>
            <p className={styles.cardBody}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at libero ut augue fermentum ullamcorper lacus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at libero ut augue fermentum ullamcorper lacus. 
            </p>
          </div>
        </li>

        <li className={styles.cardItem}>
          <div className={styles.left}>
            <div className={styles.dot} />
            <div className={styles.stem} />
          </div>
          <div className={styles.card}>
            <div className={styles.cardTitle}>Nadzor</div>
            <p className={styles.cardBody}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at libero ut augue fermentum ullamcorper lacus.
            </p>
          </div>
        </li>

        <li className={styles.cardItem}>
          <div className={styles.left}>
            <div className={styles.dot} />
            <div className={styles.stem} />
          </div>
          <div className={styles.card}>
            <div className={styles.cardTitle}>Khitbah</div>
            <p className={styles.cardBody}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at libero ut augue fermentum ullamcorper lacus.
            </p>
          </div>
        </li>

        <li className={styles.cardItem}>
          <div className={styles.dot} />
          <div className={styles.card}>
            <div className={styles.cardTitle}>Akad</div>
            <p className={styles.cardBody}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at libero ut augue fermentum ullamcorper lacus.
            </p>
          </div>
        </li>
      </ul>

    </div>
  );
}
